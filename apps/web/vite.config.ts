import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        ui: resolve(__dirname, '../../packages/ui/src'),
        'shared-types': resolve(__dirname, '../../packages/shared-types/src'),
        'shared-utils': resolve(__dirname, '../../packages/shared-utils/src'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
      open: true,
      host: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: env.VITE_APP_ENV === 'development',
      minify: env.VITE_APP_ENV === 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            supabase: ['@supabase/supabase-js'],
            query: ['@tanstack/react-query'],
          },
        },
      },
    },
    preview: {
      port: 4173,
    },
  };
});
