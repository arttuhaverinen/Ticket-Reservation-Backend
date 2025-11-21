import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Orders from "../src/components/Orders";
import "@testing-library/jest-dom"; // Import jest-dom matchers
import { Appcontext } from "../src/App";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // Import MemoryRouter for testing

describe("Orders Component", () => {
	beforeAll(() => {
		global.fetch = vi.fn((url) => {
			if (url.includes("/api/Timetables/")) {
				return Promise.resolve({
					ok: true,
					json: () =>
						Promise.resolve([
							// Ensure this returns a promise
							{
								id: 0,
								date: "2024-10-15T18:02:46.715Z",
								startTime: "string",
								endTime: "string",
								price: 0,
								departure: "Joensuu",
								destination: "Nurmes",
								day: ["monday"],
								cancelled: ["2024-10-15T18:02:46.715Z"],
								seats: ["1,2,3,4,5"],
								priceDiscount: 0,
							},
						]),
				});
			}
			if (url.includes("open-meteo")) {
				return Promise.resolve({
					ok: true,
					json: () =>
						Promise.resolve({
							latitude: 62.59922,
							longitude: 29.756393,
							generationtime_ms: 0.07665157318115234,
							utc_offset_seconds: 0,
							timezone: "GMT",
							timezone_abbreviation: "GMT",
							elevation: 89,
							current_weather_units: {
								time: "iso8601",
								interval: "seconds",
								temperature: "°C",
								windspeed: "km/h",
								winddirection: "°",
								is_day: "",
								weathercode: "wmo code",
							},
							current_weather: {
								time: "2025-11-21T02:30",
								interval: 900,
								temperature: -0.6,
								windspeed: 15.8,
								winddirection: 160,
								is_day: 0,
								weathercode: 3,
							},
						}),
				});
			}
		});
	});
	afterAll(() => {
		vi.restoreAllMocks(); // Clean up mocks after tests are done
	});
	//fetch(`${baseurl}/api/Timetables/${departure}/${destination}/${date}`)
	it("fetches and displays data successfully", async () => {
		//fetch(`${baseurl}/api/Timetables/${departure}/${destination}/${date}`)

		console.log("Base URL in test:", import.meta.env.VITE_BASEURL);
		window.innerWidth = 500;
		window.dispatchEvent(new Event("resize")); // Trigger the resize event

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
				<MemoryRouter
					initialEntries={[
						`/api/Timetables?Joensuu&destination=Nurmes&date=2025-02-05&time=09:00:00`, // Proper URL structure
					]}
				>
					<Orders />
				</MemoryRouter>
			</Appcontext.Provider>
		);

		await waitFor(() => {
			const ticketList = screen.getByTestId("Orders") as HTMLInputElement;

			// Assert the values
			expect(ticketList).toBeInTheDocument();
		});
	});
	/*
	it("handles fetch failure gracefully", async () => {
		// Mock the fetch function to return a failure
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: false,
				status: 500,
				json: () => Promise.reject("Internal Server Error"), // Return a rejected promise
			})
		);

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
				<MemoryRouter
					initialEntries={[
						`/api/Timetables?departure=Joensuu&destination=Tampere&time=09:00:00`,
					]}
				>
					<Orders />
				</MemoryRouter>
			</Appcontext.Provider>
		);

		// Wait for the component to handle the fetch failure
		await waitFor(() => {
			const errorMessage = screen.getByText(/error/i); // Assuming you display an error message on failure
			expect(errorMessage).toBeInTheDocument();
		});
	});
	*/
});
/*
describe("Tickets Component", () => {
	beforeAll(() => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve([
						// Ensure this returns a promise
						{
							id: 1,
							date: "2024-09-15T15:39:11.691161",
							startTime: "09:00:00",
							endTime: "09:00:00",
							price: 29.99,
							departure: "Joensuu",
							destination: "Tampere",
							day: ["monday", "tuesday", "wednesday", "thursday", "friday"],
							cancelled: [],
							seats: ["12", "13"],
							priceDiscount: null,
						},
					]),
			})
		);
	});

	afterAll(() => {
		vi.restoreAllMocks(); // Clean up mocks after tests are done
	});

	it("fetches and displays data successfully", async () => {
		console.log("Base URL in test:", import.meta.env.VITE_BASEURL); // Check base URL
		window.innerWidth = 500;
		window.dispatchEvent(new Event("resize")); // Trigger the resize event

		render(
			<MemoryRouter
				initialEntries={[
					"/tickets?departure=Joensuu&destination=Tampere&date=2024-09-04",
				]}
			>
				<Tickets />
			</MemoryRouter>
		);

		await waitFor(() => {
			const ticketList = screen.getByTestId(
				"tickets-desktop-row"
			) as HTMLInputElement;

			// Assert the values
			expect(ticketList).toBeInTheDocument();
		});
	});
});
*/
