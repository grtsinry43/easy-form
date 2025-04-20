package com.grtsinry43.dto

import kotlinx.serialization.Serializable

/**
 * @author grtsinry43
 * @date 2025/4/20 20:50
 * @description 热爱可抵岁月漫长
 */
@Serializable
data class FormUpdateRequest(
    val title: String? = null,
    val description: String? = null,
    val cover: String? = null,
    val value: String? = null
)