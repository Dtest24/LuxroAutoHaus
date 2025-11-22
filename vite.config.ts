import path from 'node:path';
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import { reactRouterHonoServer } from 'react-router-hono-server/dev';
import babel from 'vite-plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';
import { addRenderIds } from './plugins/addRenderIds';
import { aliases } from './plugins/aliases';
import consoleToParent from './plugins/console-to-parent';
import { layoutWrapperPlugin } from './plugins/layouts';
import { loadFontsFromTailwindSource } from './plugins/loadFontsFromTailwindSource';
import { nextPublicProcessEnv } from './plugins/nextPublicProcessEnv';
import { restart } from './plugins/restart';
import { restartEnvFileChange } from './plugins/restartEnvFileChange';

export default defineConfig({
  envPrefix: 'NEXT_PUBLIC_',
  optimizeDeps: {
    include: ['fast-glob', 'lucide-react'],
    exclude: [
      '@hono/auth-js/react',
      '@hono/auth-js',
      '@auth/core',
      'hono/context-storage',
      '@auth/core/errors',
      'fsevents',
      'lightningcss',
    ],
  },

  build: {
    // target: 'esnext', // allows top-level await
    ssr: false,
    outDir: 'build',
    emptyOutDir: true,
  },

  logLevel: 'info',

  plugins: [
    nextPublicProcessEnv(),
    restartEnvFileChange(),

    // Hono SSR server for React Router
    // reactRouterHonoServer({
    //   serverEntryPoint: './__create/index.ts',
    //   runtime: 'node',
    // }),

    // Babel for styled-jsx
    babel({
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: /node_modules/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ['styled-jsx/babel'],
      },
    }),

    // Watch changes in pages/layouts/routes
    restart({
      restart: [
        'src/**/page.jsx',
        'src/**/page.tsx',
        'src/**/layout.jsx',
        'src/**/layout.tsx',
        'src/**/route.js',
        'src/**/route.ts',
      ],
    }),

    consoleToParent(),
    loadFontsFromTailwindSource(),
    addRenderIds(),

    // React Router client plugin
   reactRouter(),  // no args


    tsconfigPaths(),
    aliases(),
    layoutWrapperPlugin(),
  ],

  resolve: {
    alias: {
      lodash: 'lodash-es',
      'npm:stripe': 'stripe',
      stripe: path.resolve(__dirname, './src/__create/stripe'),
      '@auth/create/react': '@hono/auth-js/react',
      '@auth/create': path.resolve(__dirname, './src/__create/@auth/create'),
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },

  clearScreen: false,

  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    port: 4000,
    hmr: {
      overlay: false,
    },
    warmup: {
      clientFiles: ['./src/app/**/*', './src/app/root.tsx', './src/app/routes.ts'],
    },
  },
});
