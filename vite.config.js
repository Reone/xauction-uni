import {defineConfig} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [
    uni(),
  ],
  server: {
    proxy: {
      // 代理配置示例
      '/api': {
        target: 'http://localhost:8080', // 你的后端服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 可选，重写路径
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {outputStyle: "expanded"}
      }
    }
  },
})
