package com.grtsinry43.services

import com.grtsinry43.dto.OAuthRegisterRequest
import com.grtsinry43.dto.UserRegisterRequest
import com.grtsinry43.dto.UserUpdateRequest
import com.grtsinry43.vo.UserVO
import kotlinx.coroutines.Dispatchers
import kotlinx.datetime.Instant
import kotlinx.datetime.toJavaInstant
import kotlinx.datetime.toKotlinInstant
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.javatime.CurrentDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime
import java.time.ZoneId

fun LocalDateTime.toKotlinInstant(): Instant {
    return this.atZone(ZoneId.systemDefault()).toInstant().toKotlinInstant()
}

fun Instant.toJavaLocalDateTime(): LocalDateTime {
    return this.toJavaInstant().atZone(ZoneId.systemDefault()).toLocalDateTime()
}

class UserService(database: Database) {
    object Users : Table() {
        val id = integer("id").autoIncrement()
        val avatar = varchar("avatar", length = 255).nullable()
        val username = varchar("username", length = 50)
        val nickname = varchar("nickname", length = 50)
        val email = varchar("email", length = 50)
        val password = varchar("password", length = 255).nullable()
        val oauthProvider = varchar("oauth_provider", length = 50).nullable()
        val oauthId = varchar("oauth_id", length = 50).nullable()
        val createAt = datetime("created_at").defaultExpression(CurrentDateTime)
        val updateAt = datetime("updated_at").defaultExpression(CurrentDateTime)

        override val primaryKey = PrimaryKey(id)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Users)
            exposedLogger.info("Database connected and Users table created")
        }
    }

    suspend fun create(user: UserRegisterRequest): Int = dbQuery {
        Users.insert {
            it[username] = user.username
            it[nickname] = user.nickname
            it[email] = user.email
            it[password] = user.password
        }[Users.id]
    }

    suspend fun createFromOauth(user: OAuthRegisterRequest): Int = dbQuery {
        Users.insert {
            it[avatar] = user.avatar
            it[username] = user.username
            it[nickname] = user.nickname
            it[email] = user.email
            it[oauthProvider] = user.oauthProvider
            it[oauthId] = user.oauthId
        }[Users.id]
    }

    suspend fun read(id: Int): UserVO? {
        return dbQuery {
            Users.selectAll()
                .where { Users.id eq id }
                .map {
                    UserVO(
                        id = it[Users.id].toString(),
                        avatar = it[Users.avatar],
                        username = it[Users.username],
                        nickname = it[Users.username],
                        email = it[Users.email],
                        oauthProvider = it[Users.oauthProvider] ?: "",
                        createAt = it[Users.createAt].toKotlinInstant()
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun getUserByEmail(email: String): UserVO? {
        return dbQuery {
            Users.selectAll()
                .where { Users.email eq email }
                .map {
                    UserVO(
                        id = it[Users.id].toString(),
                        avatar = it[Users.avatar],
                        username = it[Users.username],
                        nickname = it[Users.username],
                        email = it[Users.email],
                        oauthProvider = it[Users.oauthProvider] ?: "",
                        createAt = it[Users.createAt].toKotlinInstant()
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun getUserByOauthProviderAndId(
        oauthProvider: String,
        oauthId: String
    ): UserVO? {
        return dbQuery {
            Users.selectAll()
                .where { (Users.oauthProvider eq oauthProvider) and (Users.oauthId eq oauthId) }
                .map {
                    UserVO(
                        id = it[Users.id].toString(),
                        avatar = it[Users.avatar],
                        username = it[Users.username],
                        nickname = it[Users.username],
                        email = it[Users.email],
                        oauthProvider = it[Users.oauthProvider] ?: "",
                        createAt = it[Users.createAt].toKotlinInstant()
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun update(id: Int, user: UserUpdateRequest) {
        dbQuery {
            Users.update({ Users.id eq id }) {
                it[avatar] = user.avatar
                it[nickname] = user.nickname
            }
        }
    }

    suspend fun delete(id: Int) {
        dbQuery {
            Users.deleteWhere { Users.id.eq(id) }
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}

