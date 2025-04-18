package com.grtsinry43.common

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable

/**
 * @author grtsinry43
 * @date 2025/3/27 14:26
 * @description 热爱可抵岁月漫长
 */
@Serializable
data class ApiResponse<T>(
    val code: Int,
    val msg: String,
    @Contextual val data: T?
) {
    companion object {
        fun <T> ok(data: T? = null) = ApiResponse(0, "ok", data)
        fun error(code: Int, msg: String) = ApiResponse(code, msg, null)
        fun error(errorCode: ErrorCode) = ApiResponse(errorCode.code, errorCode.message, null)
    }
}