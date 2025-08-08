import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig(({ command }) => {
  // 根据 command 判断当前模式：'serve'（开发）或 'build'（生产）
  const isDev = command === 'serve';

  // 动态设置代理目标
  const proxyTarget = isDev
      ? 'http://localhost:8080'  // 开发环境
      : 'https://iamreone.top/servi'; // 生产环境

  return {
    plugins: [uni()],
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      loaderOptions: {
        sass: {
          sassOptions: { outputStyle: "expanded" }
        }
      }
    }
  };
});