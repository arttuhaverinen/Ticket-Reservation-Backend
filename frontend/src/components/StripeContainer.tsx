import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm.tsx";

const stripePromise = loadStripe(
	"pk_test_51Pg4YFDcYBmwHRLFrtj7Glg8qCRRFMgMVzln8AW0ltUG5EXZUf8h2GMZys9MHAKsjYCo8CIhtVysmfG28ofMWNqB00ynJKYE9V"
);

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

const StripeContainer = (ticket: TicketInterface) => {
	return (
		<div>
			<Elements stripe={stripePromise}>
				<PaymentForm {...ticket}></PaymentForm>
			</Elements>
		</div>
	);
};

export default StripeContainer;