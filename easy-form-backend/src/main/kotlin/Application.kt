package com.grtsinry43

import com.grtsinry43.config.configureDatabases
import com.grtsinry43.config.configureSecurity
import com.grtsinry43.config.configureSerialization
import com.grtsinry43.di.databaseModule
import com.grtsinry43.di.serviceModule
import com.grtsinry43.di.utilsModule
import com.grtsinry43.utils.JwtUtils
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database
import org.koin.core.context.GlobalContext
import org.koin.core.parameter.parametersOf
import org.koin.ktor.plugin.Koin

fun main(args: Array<String>) {
    io.ktor.server.cio.EngineMain.main(args)
}

fun Application.module() {
    install(Koin) {
        modules(databaseModule, serviceModule, utilsModule)
        // Provide environment to the database module
        createEagerInstances()
    }

    // Get the database instance with environment parameter
    val koin = GlobalContext.get()
    koin.get<Database> { parametersOf(environment) }

    // Initialize JwtUtils with the environment
    koin.get<JwtUtils> { parametersOf(environment) }

    configureSecurity()
    configureSerialization()
    configureDatabases()
    configureRouting()
}
