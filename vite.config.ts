import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgrPlugin from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs';
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";


// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  // optimizeDeps: {
  //   esbuildOptions: {
  //     // Enable esbuild polyfill plugins
  //     plugins: [
  //       NodeGlobalsPolyfillPlugin({
  //         process: true,
  //       }),
  //       NodeModulesPolyfillPlugin(),
  //     ],
  //   },
  // },
  build: {
    outDir: 'build',
    // rollupOptions: {
    //   output: {
    //     entryFileNames: `[name].[hash].mjs`,
    //     chunkFileNames: `[name].[hash].mjs`,
    //   },
    // },
  },
  plugins: [
    // reactRefresh(),
    react(),
    // commonjs(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
})
