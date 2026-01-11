import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';
  
  // 从环境变量读取后端地址，默认本地开发
  const proxyTarget = process.env.VITE_API_BASE_URL || 'http://localhost:8080';

  return {
    base: isDev ? '/' : '/xauction-h5/',
    plugins: [uni()],
    
    define: {
      // 将环境变量注入到运行时
      __API_BASE_URL__: JSON.stringify(proxyTarget)
    },
    
    server: {
      host: '0.0.0.0',
      port: 3000,
      
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin'],
          outputStyle: "expanded"
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
