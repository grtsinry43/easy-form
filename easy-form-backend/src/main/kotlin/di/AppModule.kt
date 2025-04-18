package com.grtsinry43.di

/**
 * @author grtsinry43
 * @date 2025/4/18 20:14
 * @description 热爱可抵岁月漫长
 */
import com.grtsinry43.services.UserService
import com.grtsinry43.utils.JwtUtils
import org.koin.dsl.module

val appModule = module {
    single { UserService(get()) } // 假设 UserService 需要一个数据库实例
    single { JwtUtils(get()) } // 假设 JwtUtils 需要一个密钥
}