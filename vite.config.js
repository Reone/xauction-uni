import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';

  // 代理配置
  const proxyTarget = isDev
      ? 'http://localhost:8080'  // 开发环境
      : 'https://iamreone.top/servi'; // 生产环境

  return {
    base:'/xauction-h5/',
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
    },
    build: {
      // 生产环境构建配置
      outDir: 'dist',
      assetsDir: 'static',
      rollupOptions: {
        output: {
          // 确保静态资源路径正确
          assetFileNames: `static/[name].[hash][extname]`,
          chunkFileNames: `static/[name].[hash].js`,
          entryFileNames: `static/[name].[hash].js`
        }
      }
    }
  };
});