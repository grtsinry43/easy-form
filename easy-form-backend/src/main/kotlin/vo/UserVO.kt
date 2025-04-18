package com.grtsinry43.vo

import kotlinx.datetime.Instant
import kotlinx.serialization.Serializable

/**
 * @author grtsinry43
 * @date 2025/4/18 19:33
 * @description 热爱可抵岁月漫长
 */
@Serializable
data class UserVO(
    val id: String,
    val avatar: String? = null,
    val nickname: String,
    val username: String,
    val email: String,
    val oauthProvider: String,
    val createAt: Instant,
)