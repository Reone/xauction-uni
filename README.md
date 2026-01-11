# X-Auction 前端项目

## 环境配置

1. 复制 `.env.example` 为 `.env`
2. 修改 `VITE_API_BASE_URL` 为你的后端地址

## 开发

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev:h5

# 构建生产版本
npm run build:h5
```

## 登录说明

- 登录后 JWT Token 会自动存储在本地
- Token 会在每次请求时自动添加到 Authorization header
- Token 过期会自动跳转登录页

## 注意事项

- 不要将 `.env` 文件提交到 Git
- 生产环境需要配置正确的 API 地址
