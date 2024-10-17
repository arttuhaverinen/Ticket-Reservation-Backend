import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../src/components/Register";
import "@testing-library/jest-dom"; // Import jest-dom matchers

import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("Register Component", () => {
	it("updates username and password state on input change", () => {
		render(<Register />);

		const usernameInput = screen.getByTestId(
			"register-username-label"
		) as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			"register-password-label"
		) as HTMLInputElement;

		// Simulate user typing into the input fields
		fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });

		// Assert the values
		expect(usernameInput.value).toBe("test@example.com");
		expect(passwordInput.value).toBe("password123");
	});
	it("triggers form submission and makes a fetch call", async () => {
		render(<Register />);

		// Mock the fetch function
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}),
			})
		);

		const usernameInput = screen.getByTestId(
			"register-username-label"
		) as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			"register-password-label"
		) as HTMLInputElement;
		const submitButton = screen.getByTestId(
			"register-submit-button"
		) as HTMLInputElement;

		fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining("/register"),
			expect.objectContaining({
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "test@example.com",
					password: "password123",
				}),
			})
		);
	});
	it("triggers form submission and makes a fetch call", async () => {
		// Mock the fetch function

		render(<Register />);

		global.fetch = await vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}),
			})
		);

		const usernameInput = screen.getByTestId(
			"register-username-label"
		) as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			"register-password-label"
		) as HTMLInputElement;
		const submitButton = screen.getByTestId(
			"register-submit-button"
		) as HTMLInputElement;

		fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining("/register"),
			expect.objectContaining({
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "test@example.com",
					password: "password123",
				}),
			})
		);

		//console.log(screen.debug()); // This will output the current HTML structure

		await waitFor(() => {
			const alertMessage = screen.getByTestId(
				"AlertMessage-div"
			) as HTMLInputElement;
			expect(alertMessage).toBeInTheDocument(); // Check if the alert is in the document
			expect(alertMessage).toHaveTextContent(
				"Käyttäjän rekisteröinti onnistui."
			); // Check if it contains the success message
		});

		//expect(alertMessage).to.exist;
		//expect(alertMessage).toContain("Käyttäjän rekisteröinti onnistui");
	});
	it("Failed fetch call triggers error alert", async () => {
		// Mock the fetch function

		render(<Register />);

		global.fetch = await vi.fn(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({}),
			})
		);

		const usernameInput = screen.getByTestId(
			"register-username-label"
		) as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			"register-password-label"
		) as HTMLInputElement;
		const submitButton = screen.getByTestId(
			"register-submit-button"
		) as HTMLInputElement;

		fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining("/register"),
			expect.objectContaining({
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "test@example.com",
					password: "password123",
				}),
			})
		);

		//console.log(screen.debug()); // This will output the current HTML structure

		await waitFor(() => {
			const alertMessage = screen.getByTestId(
				"AlertMessage-div"
			) as HTMLInputElement;
			expect(alertMessage).toBeInTheDocument(); // Check if the alert is in the document
			expect(alertMessage).toHaveTextContent(
				"Käyttäjän rekisteröinti epäonnistui."
			); // Check if it contains the success message
		});

		//expect(alertMessage).to.exist;
		//expect(alertMessage).toContain("Käyttäjän rekisteröinti onnistui");
	});
});
