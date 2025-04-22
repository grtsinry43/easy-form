package com.grtsinry43.services

import com.grtsinry43.dto.FormCreateRequest
import com.grtsinry43.dto.FormUpdateRequest
import kotlinx.coroutines.Dispatchers
import kotlinx.datetime.Instant
import kotlinx.datetime.toKotlinInstant
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.javatime.CurrentDateTime
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

/**
 * @author grtsinry43
 * @date 2025/4/20 20:42
 * @description 热爱可抵岁月漫长
 */
@Serializable
data class FormVO(
    val id: String,
    val title: String,
    val type: String,
    val description: String,
    val cover: String?,
    val value: String,
    val createAt: Instant,
    val updateAt: Instant
)

class FormService(database: Database) {
    object Forms : Table() {
        val id = integer("id").autoIncrement()
        val userId = integer("user_id").nullable()
        val title = varchar("title", length = 100)
        val type = varchar("type", length = 50)
        val description = text("description")
        val cover = varchar("cover", length = 255).nullable()
        val value = text("value")  // 存储 JSON 格式的字符串
        val createAt = datetime("created_at").defaultExpression(CurrentDateTime)
        val updateAt = datetime("updated_at").defaultExpression(CurrentDateTime)

        override val primaryKey = PrimaryKey(id)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Forms)
            exposedLogger.info("Forms table created")
        }
    }

    suspend fun create(form: FormCreateRequest, userId: String): Int = dbQuery {
        Forms.insert {
            it[title] = form.title
            it[Forms.userId] = userId.toIntOrNull()
            it[type] = form.type
            it[description] = form.description
            it[cover] = form.cover
            it[value] = form.value
        }[Forms.id]
    }

    suspend fun read(id: Int): FormVO? {
        return dbQuery {
            Forms.selectAll()
                .where { Forms.id eq id }
                .map {
                    FormVO(
                        id = it[Forms.id].toString(),
                        title = it[Forms.title],
                        type = it[Forms.type],
                        description = it[Forms.description],
                        cover = it[Forms.cover],
                        value = it[Forms.value],
                        createAt = it[Forms.createAt].toKotlinInstant(),
                        updateAt = it[Forms.updateAt].toKotlinInstant()
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun getAll(): List<FormVO> {
        return dbQuery {
            Forms.selectAll()
                .map {
                    FormVO(
                        id = it[Forms.id].toString(),
                        title = it[Forms.title],
                        type = it[Forms.type],
                        description = it[Forms.description],
                        cover = it[Forms.cover],
                        value = it[Forms.value],
                        createAt = it[Forms.createAt].toKotlinInstant(),
                        updateAt = it[Forms.updateAt].toKotlinInstant()
                    )
                }
        }
    }

    suspend fun getByType(type: String): List<FormVO> {
        return dbQuery {
            Forms.selectAll()
                .where { Forms.type eq type }
                .map {
                    FormVO(
                        id = it[Forms.id].toString(),
                        title = it[Forms.title],
                        type = it[Forms.type],
                        description = it[Forms.description],
                        cover = it[Forms.cover],
                        value = it[Forms.value],
                        createAt = it[Forms.createAt].toKotlinInstant(),
                        updateAt = it[Forms.updateAt].toKotlinInstant()
                    )
                }
        }
    }

    suspend fun update(id: Int, form: FormUpdateRequest) {
        dbQuery {
            Forms.update({ Forms.id eq id }) {
                form.title?.let { title -> it[Forms.title] = title }
                form.description?.let { desc -> it[Forms.description] = desc }
                form.cover?.let { cover -> it[Forms.cover] = cover }
                form.value?.let { value -> it[Forms.value] = value }
                it[updateAt] = LocalDateTime.now()
            }
        }
    }

    suspend fun getAllByUserId(userId: Int): List<FormVO> {
        return dbQuery {
            Forms.selectAll()
                .where { Forms.userId eq userId }
                .map {
                    FormVO(
                        id = it[Forms.id].toString(),
                        title = it[Forms.title],
                        type = it[Forms.type],
                        description = it[Forms.description],
                        cover = it[Forms.cover],
                        value = it[Forms.value],
                        createAt = it[Forms.createAt].toKotlinInstant(),
                        updateAt = it[Forms.updateAt].toKotlinInstant()
                    )
                }
        }
    }

    suspend fun delete(id: Int) {
        dbQuery {
            Forms.deleteWhere { Forms.id eq id }
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}