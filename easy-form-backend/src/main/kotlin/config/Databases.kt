package com.grtsinry43.config

import com.grtsinry43.common.ApiResponse
import com.grtsinry43.dto.UserRegisterRequest
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
    
    routing {
        // Create user
        post("/users/register") {
            val user = call.receive<UserRegisterRequest>()
            val id = userService.create(user)
            call.respond(HttpStatusCode.Created, id)
        }

        authenticate("auth-jwt") {
            get("/users/my"){
                val principal = call.principal<JWTPrincipal>()
                println(principal?.payload?.claims?.map { it.key to it.value.asString() }?.toMap())
                if (principal != null) {
                    val userId = principal.payload.getClaim("userId").asString()
                    println("User ID: $userId")
                    val user = userService.read(userId.toInt())
                    if (user != null) {
                        call.respond(HttpStatusCode.OK, ApiResponse.ok(user))
                    } else {
                        call.respond(HttpStatusCode.NotFound)
                    }
                } else {
                    call.respond(HttpStatusCode.Unauthorized)
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