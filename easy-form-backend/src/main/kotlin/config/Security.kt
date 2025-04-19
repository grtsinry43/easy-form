package com.grtsinry43.config

// 导入必要的库
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.grtsinry43.common.ApiResponse
import com.grtsinry43.common.ErrorCode
import com.grtsinry43.dto.OAuthRegisterRequest
import com.grtsinry43.services.UserService
import com.grtsinry43.utils.JwtUtils
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.apache.*
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.koin.ktor.ext.inject

// --- 定义数据类 ---
@Serializable
data class GoogleUserInfo(
    @SerialName("id") val id: String,
    @SerialName("email") val email: String,
    @SerialName("name") val name: String? = null,
    @SerialName("picture") val picture: String? = null
)

data class UserProfile(
    val provider: String,
    val userId: String,
    val email: String,
    val name: String?,
    val picture: String?
) : Principal

// --- 安全配置函数 ---
fun Application.configureSecurity() {
    val userService: UserService by inject()
    val jwtUtils: JwtUtils by inject()
    // --- 配置加载 ---
    val jwtAudience = environment.config.property("jwt.audience").getString()
    val jwtIssuer = environment.config.property("jwt.issuer").getString()
    val jwtRealm = environment.config.property("jwt.realm").getString()
    val jwtSecret = environment.config.property("jwt.secret").getString()
    val googleClientId = environment.config.property("oauth.google.clientId").getString()
    val googleClientSecret = environment.config.property("oauth.google.clientSecret").getString()

    // --- 创建 HttpClient 实例 ---
    val httpClient = HttpClient(Apache) {
        install(ContentNegotiation) {
            // 添加配置忽略未知键，增加健壮性
            json(Json { ignoreUnknownKeys = true })// 使用 Kotlinx Serialization 处理 JSON
        }
    }
    // 注册应用停止时的钩子，用于关闭 HttpClient
    environment.monitor.subscribe(ApplicationStopped) {
        log.info("正在关闭 HttpClient...")
        httpClient.close()
        log.info("HttpClient 已关闭。")
    }

    install(Authentication) {
        jwt("auth-jwt") {
            realm = jwtRealm
            verifier(
                JWT.require(Algorithm.HMAC256(jwtSecret))
                    .withAudience(jwtAudience)
                    .withIssuer(jwtIssuer)
                    .build()
            )
            validate { credential ->
                credential.payload.getClaim("userId").asString()
                    .takeIf { it.isNotEmpty() }
                    ?.toInt()
                    ?.let { userService.read(it) }
                    ?.let { JWTPrincipal(credential.payload) }
            }
            challenge { _, _ ->
                call.respond(HttpStatusCode.Unauthorized, ApiResponse.error(ErrorCode.UNAUTHORIZED))
            }
        }

        // --- Google OAuth2 配置 ---
        oauth("auth-oauth-google") {
            urlProvider = { "http://localhost:8080/oauth2/callback/google" } // 回调 URL
            providerLookup = {
                OAuthServerSettings.OAuth2ServerSettings(
                    name = "google",
                    authorizeUrl = "https://accounts.google.com/o/oauth2/auth",
                    accessTokenUrl = "https://accounts.google.com/o/oauth2/token",
                    requestMethod = HttpMethod.Post,
                    clientId = googleClientId,
                    clientSecret = googleClientSecret,
                    defaultScopes = listOf("openid", "profile", "email"), // 请求权限
                )
            }
            client = httpClient // 提供 HttpClient 实例
        }
    }

    // --- 配置路由 ---
    routing {
        // --- Google OAuth 认证相关路由 ---
        authenticate("auth-oauth-google") {
            // 登录入口
            get("/login-google") { /* Ktor 自动处理重定向 */ }

            // Google 回调处理
            get("/oauth2/callback/google") {
                val principal: OAuthAccessTokenResponse.OAuth2? = call.principal() // 获取令牌 Principal

                if (principal != null) {
                    val accessToken = principal.accessToken
                    try {
                        // 手动请求用户信息
                        val userInfo: GoogleUserInfo = httpClient.get("https://www.googleapis.com/oauth2/v2/userinfo") {
                            headers { append(HttpHeaders.Authorization, "Bearer $accessToken") }
                        }.body()
                        log.info("OAUTH2 | 在回调路由中成功获取用户信息: Email=${userInfo.email}")

                        userService.getUserByOauthProviderAndId("google", userInfo.id)?.let { user ->
                            // 用户已存在，装载即可
                            jwtUtils.apply {
                                val token = createToken(user.id)
                                call.response.headers.append(HttpHeaders.Authorization, token)
                                call.response.cookies.append(
                                    "token", token,
                                    path = "/",
                                    maxAge = 60 * 60 * 24 * 7, // 一周
                                )
                            }
                        } ?: run {
                            // 用户不存在，创建新用户
                            userService.createFromOauth(
                                user = OAuthRegisterRequest(
                                    avatar = userInfo.picture ?: "",
                                    email = userInfo.email,
                                    username = userInfo.name ?: userInfo.email,
                                    nickname = userInfo.name ?: "",
                                    oauthProvider = "google",
                                    oauthId = userInfo.id
                                )
                            ).let { userId ->
                                log.info("新用户注册成功，ID: $userId")
                                jwtUtils.apply {
                                    val token = createToken(userId.toString())
                                    call.response.headers.append(HttpHeaders.Authorization, token)
                                    call.response.cookies.append(
                                        "token", token,
                                        path = "/",
                                        maxAge = 60 * 60 * 24 * 7, // 一周
                                    )
                                }
                            }
                        }

                        // 直接响应
//                        call.respondText("你好, ${userInfo.name ?: userInfo.email}! 你的邮箱是 ${userInfo.email}。 头像: ${userInfo.picture ?: "未提供"}")
                        call.respondRedirect("http://localhost:5173/home", false) // 重定向到前端页面
                        return@get

                    } catch (e: Exception) {
                        log.error("在回调路由中获取 Google 用户信息失败: ${e.message}", e)
                        call.respondText("获取用户信息失败。", status = HttpStatusCode.InternalServerError)
                    }
                } else {
                    log.warn("Google OAuth 回调失败，未能获取 AccessTokenResponse principal。")
                    call.respondText("通过 Google 认证失败，无法获取令牌。", status = HttpStatusCode.Unauthorized)
                }
            }
        }

        // --- 其他路由 ---
        get("/") {
            call.respondText(
                """
                 <h1> 欢迎 </h1>
                 <p><a href="/login-google"> 使用 Google 登录 </a></p>
                 <p>(如果你配置了 JWT, 可添加 JWT 相关链接)</p>
                 """.trimIndent(),
                ContentType.Text.Html
            )
        }

        // 示例: JWT 保护路由
        authenticate("auth-jwt") {
            get("/api/secure-data") {
                val jwtPrincipal = call.principal<JWTPrincipal>()
                // 假设你的 JWT payload 中有 'username' claim
                val username = jwtPrincipal?.payload?.getClaim("username")?.asString() ?: "受保护用户"
                call.respondText("你好 $username, 这是受 JWT 保护的数据。")
            }
        }
    }
}