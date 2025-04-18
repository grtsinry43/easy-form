package com.grtsinry43.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.server.config.*
import java.util.*

/**
 * @author grtsinry43
 * @date 2025/3/27 17:54
 * @description 热爱可抵岁月漫长
 */
class JwtUtils(config: ApplicationConfig) {
    private val secret = config.property("jwt.secret").getString()
    private val issuer = config.property("jwt.issuer").getString()
    private val audience = config.property("jwt.audience").getString()
    private val expirationInDays = config.property("jwt.expirationInDays").getString().toInt()

    fun createToken(userId: String): String = JWT.create()
        .withAudience(audience)
        .withIssuer(issuer)
        .withClaim("userId", userId)
        .withExpiresAt(Date(System.currentTimeMillis() + (expirationInDays * 24 * 60 * 60 * 1000)))
        .sign(Algorithm.HMAC256(secret))

    fun verifyToken(token: String): JWT = JWT.require(Algorithm.HMAC256(secret))
        .withAudience(audience)
        .withIssuer(issuer)
        .build()
        .verify(token) as JWT
}