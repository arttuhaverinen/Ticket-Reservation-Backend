import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		viewportWidth: 1280,
		viewportHeight: 2000,
		chromeWebSecurity: false, // Add the chromeWebSecurity setting here
	},
});
