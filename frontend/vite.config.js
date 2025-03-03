import { defineConfig } from 'vite';
export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost'
        },
        port: process.env.PORT_VITE || 5173,
    },
    define: {
        'process.env': {
            USER_ID: process.env.USER_ID
        }
    }
});