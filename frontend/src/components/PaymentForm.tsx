import React, { useContext, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Card, Form } from "react-bootstrap";
import "../App.css";
import { Appcontext } from "../App";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" },
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee",
		},
	},
};

interface TicketInterface {
	startTime: string;
	endTime: string;
	date: string;
	expired: boolean;
	departure: string;
	destination: string;
	name: string;
	seat: number;
	timetablesId: string;
	appUserId: string | null;
}

const PaymentForm = (ticket: TicketInterface) => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [success, setSuccess] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	const { appUserName, setAppUserName, appToken, setAppToken, isAdmin } =
		useContext(Appcontext)!;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		/*
		const { error, paymentMethod } = await stripe?.createPaymentMethod({
			type: "card",
			card: elements?.getElement(CardElement),
		});
		*/

		if (stripe) {
			try {
				//const { id } = paymentMethod;
				const response = await fetch(`${baseurl}/Checkout`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${appToken}`,
					},
					body: JSON.stringify({
						StartTime: ticket.startTime,
						EndTime: ticket.endTime,
						Date: ticket.date,
						Expired: ticket.expired,
						Departure: ticket.departure,
						Destination: ticket.destination,
						Name: ticket.name,
						Seat: ticket.seat,
						TimetablesId: ticket.timetablesId,
						AppUserId: appToken,
					}),
				});
				if (response) {
					const data = await response.json();

					console.log(data);
					stripe.redirectToCheckout({ sessionId: data.sessionId });
					console.log("success");
					setSuccess(true);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			//console.log(error.message);
		}
	};

	return (
		<div>
			{!success ? (
				<form onSubmit={(e) => handleSubmit(e)}>
					<fieldset className="formGroup">
						{/*<div className="formRow">
							<CardElement></CardElement>
			</div>*/}
					</fieldset>
					<button className="bg-primary">Vahvista tilaus</button>
				</form>
			) : (
				<div>
					<h2>You just bought this item!</h2>
				</div>
			)}
		</div>
	);
};

export default PaymentForm;
