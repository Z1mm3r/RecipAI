import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'



// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        base: '/',
        define: {
            'process.env.API_ENDPOINT': JSON.stringify(env.API_ENDPOINT)
        },
        plugins: [react()],
        server: {
            port: 5173
        },
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setupTests.ts',
            css: true,
            reporters: ['verbose'],
            coverage: {
                reporter: ['text', 'json', 'html'],
                include: ['src/**/*'],
                exclude: []
            }
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@assets': path.resolve(__dirname, './public'),
                '@components': path.resolve(__dirname, './src/components'),
                '@screens': path.resolve(__dirname, './src/screens'),
                '@customTypes': path.resolve(__dirname, './src/types')
            }
        }
    }
})