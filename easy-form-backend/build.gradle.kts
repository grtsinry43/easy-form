val exposed_version: String by project
val h2_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val postgres_version: String by project

plugins {
    kotlin("jvm") version "2.1.20"
    id("io.ktor.plugin") version "3.1.1"
    id("org.jetbrains.kotlin.plugin.serialization") version "2.1.20"
}

group = "com.grtsinry43"
version = "0.0.1"

application {
    mainClass = "io.ktor.server.cio.EngineMain"

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
    maven { url = uri("https://jitpack.io") }
}

dependencies {
    implementation("io.ktor:ktor-server-core")
    implementation("io.ktor:ktor-server-auth")
    implementation("io.ktor:ktor-server-auth-jwt")
    implementation("io.ktor:ktor-client-core")
    implementation("io.ktor:ktor-client-apache")
    implementation("dev.hayden:khealth:3.0.2")
    implementation("io.ktor:ktor-server-content-negotiation")
    implementation("io.ktor:ktor-serialization-kotlinx-json")
    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    implementation("com.h2database:h2:$h2_version")
    implementation("org.postgresql:postgresql:$postgres_version")
    implementation("com.ucasoft.ktor:ktor-simple-cache:0.53.4")
    implementation("com.ucasoft.ktor:ktor-simple-redis-cache:0.53.4")
    implementation("io.ktor:ktor-server-cio")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("io.ktor:ktor-server-config-yaml")
    testImplementation("io.ktor:ktor-server-test-host")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
}
