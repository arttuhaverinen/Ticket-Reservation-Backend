import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../src/components/Login";
import "@testing-library/jest-dom"; // Import jest-dom matchers
import { Appcontext } from "../src/App";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import { Link } from "react-router-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // Import MemoryRouter for testing

describe("Login Component", () => {
	it("updates username and password state on input change", () => {
		const mockAppContext = {
			appUserName: "mockuser",
			setAppUserName: vi.fn(),
			appToken: "mocktoken",
			setAppToken: vi.fn(),
			appRefreshToken: "mocktoken",
			setAppRefreshToken: vi.fn(),
		};

		render(
			<Appcontext.Provider value={mockAppContext}>
				<MemoryRouter>
					<Login />
				</MemoryRouter>{" "}
			</Appcontext.Provider>
		);

		const usernameInput = screen.getByTestId(
			"login-username-label"
		) as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			"login-password-label"
		) as HTMLInputElement;

		// Simulate user typing into the input fields
		fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });

		// Assert the values
		expect(usernameInput.value).toBe("test@example.com");
		expect(passwordInput.value).toBe("password123");
	});

	it("Succesful login", async () => {
		// Mock the fetch function
		const mockAppContext = {
			appUserName: "mockuser",
			setAppUserName: vi.fn(),
			appToken: "mocktoken",
			setAppToken: vi.fn(),
			appRefreshToken: "mocktoken",
			setAppRefreshToken: vi.fn(),
		};

		render(
			<Appcontext.Provider value={mockAppContext}>
				<MemoryRouter>
					<Login />
				</MemoryRouter>
			</Appcontext.Provider>
		);

		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}),
			})
		);

		const usernameInput = screen.getByTestId(
			"login-username-label"
		) as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			"login-password-label"
		) as HTMLInputElement;
		const submitButton = screen.getByTestId(
			"login-submit-button"
		) as HTMLInputElement;

		fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining("/login"),
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

		const mockAppContext = {
			appUserName: "mockuser",
			setAppUserName: vi.fn(),
			appToken: "mocktoken",
			setAppToken: vi.fn(),
			appRefreshToken: "mocktoken",
			setAppRefreshToken: vi.fn(),
		};

		render(
			<Appcontext.Provider value={mockAppContext}>
				<MemoryRouter>
					<Login />
				</MemoryRouter>{" "}
			</Appcontext.Provider>
		);

		global.fetch = await vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({}),
			})
		);

		const usernameInput = screen.getByTestId(
			"login-username-label"
		) as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			"login-password-label"
		) as HTMLInputElement;
		const submitButton = screen.getByTestId(
			"login-submit-button"
		) as HTMLInputElement;

		fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining("/login"),
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
			expect(alertMessage).toHaveTextContent("Kirjautuminen onnistui."); // Check if it contains the success message
		});

		//expect(alertMessage).to.exist;
		//expect(alertMessage).toContain("Käyttäjän rekisteröinti onnistui");
	});

	it("Failed fetch call triggers error alert", async () => {
		// Mock the fetch function

		const mockAppContext = {
			appUserName: "mockuser",
			setAppUserName: vi.fn(),
			appToken: "mocktoken",
			setAppToken: vi.fn(),
			appRefreshToken: "mocktoken",
			setAppRefreshToken: vi.fn(),
		};

		render(
			<Appcontext.Provider value={mockAppContext}>
				<MemoryRouter>
					<Login />
				</MemoryRouter>{" "}
			</Appcontext.Provider>
		);
		global.fetch = await vi.fn(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({}),
			})
		);

		const usernameInput = screen.getByTestId(
			"login-username-label"
		) as HTMLInputElement;
		const passwordInput = screen.getByTestId(
			"login-password-label"
		) as HTMLInputElement;
		const submitButton = screen.getByTestId(
			"login-submit-button"
		) as HTMLInputElement;

		fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		expect(global.fetch).toHaveBeenCalledWith(
			expect.stringContaining("/login"),
			expect.objectContaining({
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: "test@example.com",
					password: "password123",
				}),
			})
		);

		await waitFor(() => {
			const alertMessage = screen.getByTestId(
				"AlertMessage-div"
			) as HTMLInputElement;
			expect(alertMessage).toBeInTheDocument(); // Check if the alert is in the document
			expect(alertMessage).toHaveTextContent("Kirjautuminen epäonnistui."); // Check if it contains the success message
		});

		//expect(alertMessage).to.exist;
		//expect(alertMessage).toContain("Käyttäjän rekisteröinti onnistui");
	});
});
