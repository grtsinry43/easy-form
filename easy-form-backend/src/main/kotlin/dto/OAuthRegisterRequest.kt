package com.grtsinry43.dto

/**
 * @author grtsinry43
 * @date 2025/4/18 19:46
 * @description 热爱可抵岁月漫长
 */
data class OAuthRegisterRequest(
    val avatar: String,
    val username: String,
    val nickname: String,
    val email: String,
    val oauthProvider: String,
    val oauthId: String
)