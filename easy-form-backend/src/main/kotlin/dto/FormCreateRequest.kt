package com.grtsinry43.dto

import kotlinx.serialization.Serializable

/**
 * @author grtsinry43
 * @date 2025/4/20 20:49
 * @description 热爱可抵岁月漫长
 */
@Serializable
data class FormCreateRequest(
    val title: String,
    val type: String,
    val description: String,
)
