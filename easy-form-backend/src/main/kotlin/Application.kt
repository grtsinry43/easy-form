package com.grtsinry43

import com.grtsinry43.configureSecurity
import com.grtsinry43.di.appModule
import io.ktor.server.application.*
import org.koin.ktor.plugin.Koin

fun main(args: Array<String>) {
    io.ktor.server.cio.EngineMain.main(args)
}

fun Application.module() {
    install(Koin) {
        modules(appModule)
    }
    configureSecurity()
//    configureMonitoring()
    configureSerialization()
    configureDatabases()
//    configureHTTP()
    configureRouting()
}
