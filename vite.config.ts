import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import macros from 'vite-plugin-babel-macros';

const ROOT = __dirname;

export default defineConfig({
  root: path.resolve(ROOT, 'pages'),
  appType: 'mpa',
  publicDir: path.resolve(ROOT, 'public'),

  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },

  esbuild: {
    logOverride: {
      'this-is-undefined-in-esm': 'silent',
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(ROOT, 'src'),
    },
  },

  css: {
    modules: {
      generateScopedName: '[name]',
    },
  },

  build: {
    outDir: path.resolve(ROOT, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: path.resolve(ROOT, 'pages/index.html'),
        home: path.resolve(ROOT, 'pages/home/index.html'),
      },
      output: {
        entryFileNames: 'shared/[name].js',
        chunkFileNames: 'shared/[name].js',
        assetFileNames: 'shared/[name][extname]',
      },
    },
  },

  plugins: [
    react({
      babel: {
        plugins: [
          'babel-plugin-macros',
          [
            '@emotion/babel-plugin-jsx-pragmatic',
            {
              export: 'jsx',
              import: '__cssprop',
              module: '@emotion/react',
            },
          ],
          ['@babel/plugin-transform-react-jsx', { pragma: '__cssprop' }],
        ],
      },
      include: /\.(jsx|js|mdx|md|tsx|ts)$/,
    }),
    macros(),
  ],
});
