# EasyForm

> 这个项目还在开发中，敬请期待... 

## 项目介绍

EasyForm 是一个零代码表单生成器，让用户能够通过简单的拖拽操作快速创建专业的表单。无需编写代码，即可设计、发布和管理各类表单，并收集数据。

## 技术栈

### 前端
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vue Router** - Vue.js 官方路由管理器
- **Naive UI** - 基于 Vue 3 的组件库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Vite** - 现代前端构建工具
- **Axios** - 基于 Promise 的 HTTP 客户端

### 后端
- **Ktor** - Kotlin 的异步 Web 框架
- **Exposed** - Kotlin SQL 框架
- **PostgreSQL** - 开源关系型数据库

## 核心特性

- 🖱️ **拖拽式设计** - 简单拖拽即可创建专业表单，无需编写代码
- ⚡ **快速部署** - 一键发布您的表单，立即开始收集数据
- 📱 **响应式设计** - 在任何设备上都能完美展示您的表单
- 🔄 **API 集成** - 轻松与第三方服务集成，实现数据流转

## 快速开始

### 环境要求

- Node.js 16+
- Java 11+
- PostgreSQL 13+

### 前端安装

```bash
# 克隆仓库
git clone https://github.com/grtsinry43/easyform.git
cd easyform/easy-form-frontend

# 安装依赖
pnpm install

# 本地开发
pnpm run dev

p# 构建生产版本
npm run build
```

### 后端安装

```bash
# 进入后端目录
cd ../easy-form-backend

# 使用 Gradle 运行
./gradlew run

# 或者构建 JAR 文件
./gradlew build
```

### 配置数据库

1. 创建 PostgreSQL 数据库
2. 修改 `easy-form-backend/src/main/resources/application.yaml` 中的数据库连接配置

## 项目结构

```
easyform/
├── frontend/                # Vue 前端项目
│   ├── src/
│   │   ├── api/             # API 请求
│   │   ├── assets/          # 静态资源
│   │   ├── components/      # Vue 组件
│   │   ├── router/          # 路由配置
│   │   ├── styles/          # 样式文件
│   │   ├── utils/           # 工具函数
│   │   └── views/           # 页面视图
│   ├── public/              # 公共文件
│   └── vite.config.ts       # Vite 配置
└── backend/                 # Ktor 后端项目
    ├── src/
    │   ├── main/
    │   │   ├── kotlin/      # Kotlin 源代码
    │   │   └── resources/   # 配置文件
    │   └── test/            # 测试代码
    └── build.gradle.kts     # Gradle 构建配置
```

## 开发说明

### 前端开发

前端使用 Vite 作为构建工具，开发模式下支持热更新。API 请求通过 `/api` 代理到后端服务器。

### 后端开发

后端使用 Ktor 框架，基于 Kotlin 协程提供高性能的异步服务。数据库操作使用 Exposed ORM 框架。

## 贡献指南

1. Fork 项目仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个 Pull Request

## 许可证

[MIT License](LICENSE)
