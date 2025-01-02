import React, { useEffect, useContext, useState } from "react";
import { Appcontext } from "../App";
import { Col, Row } from "react-bootstrap";
const OwnTickets = () => {
	interface ticketInterface {
		date: string;
		startTime: string;
		endTime: string;
		departure: string;
		destination: string;
		seat: string;
		name: string;
	}

	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [tickets, setTickets] = useState<ticketInterface[]>();
	const { appUserName, setAppUserName, appToken, setAppToken, isAdmin } =
		useContext(Appcontext)!;
	useEffect(() => {
		console.log(appToken);
		let url = isAdmin ? "api/tickets" : "api/ticketsbyuser";
		fetch(`${baseurl}/${url}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setTickets(res);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<Row className="gap-3 justify-content-center">
				<h3>Ostetut liput</h3>
				{tickets &&
					tickets.map((ticket) => {
						return (
							<Col className="shadow p-2 my-1 bg-white rounded" xs={5}>
								<ul>
									<li>Päivämäärä: {ticket.date.slice(0, 10)}</li>
									<li>Lähtöaika: {ticket.startTime}</li>
									<li>Saapumisaika: {ticket.endTime}</li>
									<li>Lähtöpaikka: {ticket.departure}</li>
									<li>Saapumispaikka: {ticket.destination}</li>
									<li>Istumapaikka: {ticket.seat}</li>
									<li>Käyttäjänimi: {ticket.name}</li>
								</ul>
							</Col>
						);
					})}
			</Row>
		</div>
	);
};

export default OwnTickets;
