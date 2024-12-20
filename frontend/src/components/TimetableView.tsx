import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const TimetableView = () => {
	interface timetableInterface {
		id: number;
		departure: string;
		destination: string;
		startTime: string;
		endTime: string;
		price: number;
		priceDiscount: number | null;
		day: string[];
	}

	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [timetables, setTimetables] = useState<timetableInterface[]>();

	useEffect(() => {
		fetch(`${baseurl}/api/Timetables`)
			.then((res) => res.json())
			.then((res) => setTimetables(res))
			.catch((err) => console.log(err));
	}, []);

	const mapTimetables = () => {
		if (timetables) {
			console.log(timetables);
			return timetables.map((timetable) => {
				return (
					<tr key={timetable.id}>
						<td>{timetable.departure}</td>
						<td>{timetable.destination}</td>
						<td>{timetable.startTime}</td>
						<td>{timetable.endTime}</td>
						<td>
							{timetable.priceDiscount ? (
								<>
									<s>{timetable.price}</s> | {timetable.priceDiscount}
								</>
							) : (
								timetable.price
							)}
						</td>
						<td>{timetable.day.toString()}</td>
						<td>
							<Link to={`modifytimetable?Timetable=${timetable.id}`}>
								{" "}
								<Button>Muokkaa</Button>
							</Link>
						</td>
						<td>
							<Button className="btn btn-danger">Poista</Button>
						</td>
					</tr>
				);
			});
		}
	};

	return (
		<div className="shadow p-3 my-5 mb-5 bg-white rounded">
			<h3>Ajovuorot</h3>
			<Link to={"createtimetable"}>
				<Button className="w-100 my-3">Lisää uusi vuoro</Button>
			</Link>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Lähtö</th>
						<th>Kohde</th>
						<th>Lähtöaika</th>
						<th>Saapumisaika</th>
						<th>Hinta</th>
						<th>Ajopäivät</th>
						<th>Muokkaa</th>
						<th>Poista</th>
					</tr>
				</thead>
				<tbody>{mapTimetables()}</tbody>
			</Table>
		</div>
	);
};

export default TimetableView;
