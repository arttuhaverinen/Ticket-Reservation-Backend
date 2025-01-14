import { useEffect, useContext, useState } from "react";
import { Appcontext } from "../App";
import { Row } from "react-bootstrap";
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
	const { appToken, isAdmin } = useContext(Appcontext)!;
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
				<h3>Ostamasi liput</h3>
				{tickets &&
					tickets.map((ticket) => {
						return (
							<div className="bg-white rounded p-3">
								<div className="card mb-3 p-3">
									<div className="card-body">
										<h5 className="card-title">
											{ticket.departure} → {ticket.destination}
										</h5>
										<p>
											<strong>Päivämäärä:</strong> {ticket.date.slice(0, 10)}
										</p>
										<p>
											<strong>Lähtöaika:</strong> {ticket.startTime}
										</p>
										<p>
											<strong>Saapumisaika:</strong> {ticket.endTime}
										</p>
										<p>
											<strong>Käyttäjänimi:</strong> {ticket.name}
										</p>
										<p>
											<strong>Istumapaikka:</strong> {ticket.seat}
										</p>
									</div>
								</div>
							</div>
						);
					})}
			</Row>
		</div>
	);
};

export default OwnTickets;
