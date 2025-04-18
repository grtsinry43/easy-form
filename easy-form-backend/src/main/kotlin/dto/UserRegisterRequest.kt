package com.grtsinry43.dto

import kotlinx.serialization.Serializable

/**
 * @author grtsinry43
 * @date 2025/4/18 14:27
 * @description 热爱可抵岁月漫长
 */
@Serializable
data class UserRegisterRequest(
    val username: String,
    val nickname: String,
    val password: String,
    val email: String,
)