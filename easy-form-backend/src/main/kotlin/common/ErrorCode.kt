package com.grtsinry43.common

/**
 * @author grtsinry43
 * @date 2025/3/27 14:28
 * @description 热爱可抵岁月漫长
 */
enum class ErrorCode(val code: Int, val message: String) {
    OK(0, "ok"),
    BAD_REQUEST(400, "Bad Request"),
    UNAUTHORIZED(401, "Unauthorized"),
    FORBIDDEN(403, "Forbidden"),
    NOT_FOUND(404, "Not Found"),
    INTERNAL_SERVER_ERROR(500, "Internal Server Error"),
    BAD_GATEWAY(502, "网关错误"),
    USER_ALREADY_EXISTS(409, "User Already Exists"),
    INVALID_CREDENTIALS(401, "Invalid Credentials")
}