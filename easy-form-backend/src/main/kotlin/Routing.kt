package com.grtsinry43

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.ucasoft.ktor.simpleCache.SimpleCache
import com.ucasoft.ktor.simpleCache.cacheOutput
import com.ucasoft.ktor.simpleRedisCache.*
import dev.hayden.KHealth
import io.ktor.client.*
import io.ktor.client.engine.apache.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import java.sql.Connection
import java.sql.DriverManager
import kotlin.random.Random
import kotlin.time.Duration.Companion.seconds
import org.jetbrains.exposed.sql.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
    }
}
