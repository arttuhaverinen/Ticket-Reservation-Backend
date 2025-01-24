import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

import react from "@vitejs/plugin-react-swc";

const mode = process.env.VITE_ENV || "development";
const env = loadEnv(mode, process.cwd());

console.log(mode);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	server: {
		host: "0.0.0.0", // Ensure it's set to listen on all interfaces
		port: parseInt(env.VITE_PORT) || 5173, // This should match your port mapping
		watch: {
			usePolling: true, // Necessary for hot reloads inside Docker
		},
		cors: true, // Enable CORS for all origins
	},
	test: {
		environment: "jsdom", // Set the test environment to jsdom
		globals: true, // Enable global like `describe`, `it`, etc.
		setupFiles: "./vitest.setup.js", // Path to your setup file
	},
});
