const { test, expect } = require("@playwright/test");

test("should load the homepage", async ({ page }) => {
	await page.goto("http://test-client-vite:5173"); // 'app' is the name of the service in Docker Compose
	const navbar = await page.$('[data-testid="navbar"]');
	expect(navbar).not.toBeNull();
});
