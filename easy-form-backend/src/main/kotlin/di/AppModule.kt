package com.grtsinry43.di

/**
 * @author grtsinry43
 * @date 2025/4/18 20:14
 * @description 热爱可抵岁月漫长
 */
import com.grtsinry43.services.FormService
import com.grtsinry43.services.UserService
import com.grtsinry43.utils.JwtUtils
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database
import org.koin.dsl.module

val databaseModule = module {
    single { (environment: ApplicationEnvironment) ->
        Database.connect(
            url = environment.config.property("postgres.url").getString(),
            user = environment.config.property("postgres.user").getString(),
            driver = "org.postgresql.Driver",
            password = environment.config.property("postgres.password").getString()
        )
    }
}

val serviceModule = module {
    single { UserService(get()) }
    single { FormService(get()) }
}

val utilsModule = module {
    single { (environment: ApplicationEnvironment) ->
        JwtUtils(environment.config)
    }
}