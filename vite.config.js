import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    server: {
      host: true,
      port: 3000,
    },
    plugins: [react()],
    define: {
      global: mode === 'development' ? 'globalThis' : getGlobalVariable(),
      'process.env': env,
    },

    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: getGlobalVariable(),
        },

        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
  })
}

function getGlobalVariable() {
  let globalVariable = 'globalThis'

  try {
    require.resolve('@safe-global/safe-apps-provider')
    require.resolve('@safe-global/safe-apps-sdk')
    globalVariable = 'global'
  } catch (e) {
    // If either module is not found, fallback to globalThis
    globalVariable = 'globalThis'
  }

  return globalVariable
}
