// vitest.setup.js
import { vi } from "vitest";

vi.stubGlobal("import.meta", {
	env: {
		VITE_BASEURL: "http://localhost:5001",
	},
});
