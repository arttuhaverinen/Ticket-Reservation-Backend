import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

const Offers = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [destination, setDestination] = useState();
	const [departure, setDeparture] = useState();
	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();
	const [price, setPrice] = useState();
	const [days, setDays] = useState();
	const [monday, setMonday] = useState(false);
	const [tuesday, setTuesday] = useState(false);
	const [wednesday, setWednesday] = useState(false);
	const [thursday, setThursday] = useState(false);
	const [friday, setFriday] = useState(false);
	const [saturday, setSaturday] = useState(false);
	const [sunday, setSunday] = useState(false);
	const [timetables, setTimetables] = useState([]);
	const [startDate, setStartDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const dayNames = [
		"Sunnuntai",
		"Maanantai",
		"Tiistai",
		"Keskiviikko",
		"Torstai",
		"Perjantai",
		"Lauantai" /* , … */,
	];

	useEffect(() => {
		fetch(`${baseurl}/api/Timetables?offers=true`)
			.then((res) => res.json())
			.then((data) => {
				setTimetables(data);
				setDestination(data.destination);
				setDeparture(data.departure);
				setStartTime(data.startTime);
				setEndTime(data.endTime);
				setPrice(data.price);
				setMonday(data.day.includes("monday") ? true : false);
				setTuesday(data.day.includes("tuesday") ? true : false);
				setWednesday(data.day.includes("wednesday") ? true : false);
				setThursday(data.day.includes("thursday") ? true : false);
				setFriday(data.day.includes("friday") ? true : false);
				setSaturday(data.day.includes("saturday") ? true : false);
				setSunday(data.day.includes("sunday") ? true : false);
			})
			.catch((err) => console.log(err));
	}, []);
	// http://localhost:5173/orders?departure=Joensuu&destination=Tampere&date=2024-09-13&time=09:00:00
	const mapDays = (days: string[]) => {
		let finnishDays = [];
		for (let index = 0; index < days.length; index++) {
			finnishDays.push(`${dayNames[index]}, `);
		}
		console.log("finnishdays", finnishDays);
		return finnishDays;
	};
	const mapTimetables = () => {
		console.log(timetables);
		if (timetables) {
			return timetables.map((tt) => {
				return (
					<Col md={12} lg={5} className="shadow p-3 my-2 bg-white rounded">
						<ul className="">
							<li>
								{<strike>{tt.price}€</strike>}{" "}
								{Math.floor((tt.price - 5) * 100) / 100}€
							</li>
							<li>Päivämäärä: {mapDays(tt.day)}</li>
							<li>Lähtöaika: {tt.startTime}</li>
							<li>Saapumisaika: {tt.endTime}</li>
							<li>Lähtöpaikka: {tt.departure}</li>
							<li>Saapumispaikka: {tt.destination}</li>
						</ul>
						<Row className="">
							{/** <!-- justify-content-center --> */}
							<Col className=" d-flex align-items-center">
								<Link
									className="text-center btn btn-primary"
									to={`/orders?departure=${tt.departure}&destination=${tt.destination}&date=${startDate}&time=${tt.startTime}`}
								>
									Osta
								</Link>
							</Col>
							<Col className="">
								Päivämäärä
								<DatePicker
									className="datepicker"
									locale="fi"
									selected={startDate}
									dateFormat="dd/MM/yyyy"
									onChange={(date) =>
										setStartDate(date?.toISOString().split("T")[0])
									}
								></DatePicker>
							</Col>
						</Row>
					</Col>
				);
			});
		}
	};

	return (
		<Container>
			<h3>Tarjousliput</h3>
			<Row className=" justify-content-between align-items-center  ">
				{mapTimetables()}
			</Row>
		</Container>
	);
};

export default Offers;
