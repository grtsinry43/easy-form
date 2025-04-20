package com.grtsinry43.config

import com.grtsinry43.common.ApiResponse
import com.grtsinry43.common.ErrorCode
import com.grtsinry43.dto.FormCreateRequest
import com.grtsinry43.dto.FormUpdateRequest
import com.grtsinry43.dto.UserRegisterRequest
import com.grtsinry43.services.FormService
import com.grtsinry43.services.UserService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.authenticate
import io.ktor.server.auth.jwt.JWTPrincipal
import io.ktor.server.auth.principal
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import org.koin.ktor.ext.inject

fun Application.configureDatabases() {
    // Use Koin to get the UserService instance
    val userService: UserService by inject()
    val formService: FormService by inject()

    routing {
        // Create user
        post("/users/register") {
            val user = call.receive<UserRegisterRequest>()
            val id = userService.create(user)
            call.respond(HttpStatusCode.Created, id)
        }

        authenticate("auth-jwt") {
            get("/user/info") {
                call.principal<JWTPrincipal>()?.let { principal ->
                    principal.payload.getClaim("userId").asString().let { userId ->
                        userService.read(userId.toInt())?.let { user ->
                            call.respond(HttpStatusCode.OK, ApiResponse.ok(user))
                        } ?: call.respond(HttpStatusCode.NotFound)
                    }
                } ?: call.respond(HttpStatusCode.Unauthorized)
            }
        }

        authenticate("auth-jwt") {
            post("/form/create") {
                val form = call.receive<FormCreateRequest>()
                call.principal<JWTPrincipal>()?.let { principal ->
                    principal.payload.getClaim("userId").asString().let { userId ->
                        formService.create(form, userId)
                        call.respond(HttpStatusCode.Created, ApiResponse.ok("Form created successfully"))
                    }
                } ?: call.respond(HttpStatusCode.Unauthorized)
            }

            put("/form/update/{id}") {
                val form = call.receive<FormUpdateRequest>()
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("无效ID")
                call.principal<JWTPrincipal>()?.let { principal ->
                    principal.payload.getClaim("userId").asString().let { userId ->
                        formService.update(id, form)
                        call.respond(HttpStatusCode.Created, ApiResponse.ok("Form created successfully"))
                    }
                } ?: call.respond(HttpStatusCode.Unauthorized)
            }

            get("/form/{id}") {
                val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("无效ID")
                val form = formService.read(id)
                if (form != null) {
                    call.respond(HttpStatusCode.OK, ApiResponse.ok(form))
                } else {
                    call.respond(HttpStatusCode.NotFound, ApiResponse.error(ErrorCode.NOT_FOUND))
                }
            }
        }


        // Read user
        get("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            val user = userService.read(id)
            if (user != null) {
                call.respond(HttpStatusCode.OK, ApiResponse.ok(user))
            } else {
                call.respond(HttpStatusCode.NotFound)
            }
        }

//        // Update user
//        put("/users/{id}") {
//            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
//            val user = call.receive<ExposedUser>()
//            userService.update(id, user)
//            call.respond(HttpStatusCode.OK)
//        }

        // Delete user
        delete("/users/{id}") {
            val id = call.parameters["id"]?.toInt() ?: throw IllegalArgumentException("Invalid ID")
            userService.delete(id)
            call.respond(HttpStatusCode.OK)
        }
    }
}