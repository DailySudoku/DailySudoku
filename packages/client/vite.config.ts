import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import {cloudflare} from "@cloudflare/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), cloudflare()],
	envDir: '../../',
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				secure: false,
				ws: true,
			},
		},
		hmr: {
			clientPort: 443,
		},
        allowedHosts: [
            'hurensohn.ihatemy.live'
        ]
	},
});
