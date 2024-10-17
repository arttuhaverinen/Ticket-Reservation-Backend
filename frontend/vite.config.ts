import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	server: {
		host: "0.0.0.0", // Ensure it's set to listen on all interfaces
		port: 5173, // This should match your port mapping
		watch: {
			usePolling: true, // Necessary for hot reloads inside Docker
		},
	},
	test: {
		environment: "jsdom", // Set the test environment to jsdom
		globals: true, // Enable global like `describe`, `it`, etc.
		setupFiles: "./vitest.setup.js", // Path to your setup file
	},
});
