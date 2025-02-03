import { useEffect, useState, useContext } from "react";
import { Col, Container, Placeholder, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { Appcontext } from "../App";

const Offers = () => {
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
	const { darkMode } = useContext(Appcontext);
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
	const [timetables, setTimetables] = useState<timetableInterface[] | null>(
		null
	);
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
				console.log(data);
				setTimetables(data);
				//setDestination(data.destination);
				//setDeparture(data.departure);
				//setStartTime(data.startTime);
				//setEndTime(data.endTime);
				//setPrice(data.price);
				//setMonday(data.day.includes("monday") ? true : false);
				//setTuesday(data.day.includes("tuesday") ? true : false);
				//setWednesday(data.day.includes("wednesday") ? true : false);
				//setThursday(data.day.includes("thursday") ? true : false);
				//setFriday(data.day.includes("friday") ? true : false);
				//setSaturday(data.day.includes("saturday") ? true : false);
				//setSunday(data.day.includes("sunday") ? true : false);
			})
			.catch((err) => console.log(err));
	}, []);
	// http://localhost:5173/orders?departure=Joensuu&destination=Tampere&date=2024-09-13&time=09:00:00
	/*
	const mapDays = (days: string[]) => {
		let finnishDays = [];
		for (let index = 0; index < days.length; index++) {
			finnishDays.push(`${dayNames[index]}, `);
		}
		console.log("finnishdays", finnishDays);
		return finnishDays;
	};
	*/
	const mapTimetables = () => {
		console.log(timetables);
		if (timetables) {
			return timetables.map((tt) => {
				return (
					<Col className="" md={12} lg={6}>
						<div className="gray-div  rounded p-3">
							<div className="card gray-div mb-3 p-3" key={tt.id}>
								<div className="">
									<h5 className="card-title">
										{tt.departure} → {tt.destination}
									</h5>
									<p>
										<strong>Lähtöaika:</strong> {tt.startTime}
									</p>
									<p>
										<strong>Saapumisaika:</strong> {tt.endTime}
									</p>
									<p>
										<strong>Hinta:</strong>{" "}
										{tt.priceDiscount ? (
											<>
												<s>{tt.price}</s> | {tt.priceDiscount}
											</>
										) : (
											tt.price
										)}
									</p>
									<p>
										<strong>Ajopäivät:</strong> {tt.day.toString()}
									</p>
								</div>
							</div>

							<Row className="">
								{/** <!-- justify-content-center --> */}
								<Col xs={3} sm={6} className="  ">
									<Link
										className="text-center btn btn-primary"
										to={`/orders?departure=${tt.departure}&destination=${tt.destination}&date=${startDate}&time=${tt.startTime}`}
									>
										Osta
									</Link>
								</Col>
								<Col xs={9} sm={6} className="">
									<span>Päivämäärä </span>
									<DatePicker
										className="datepicker"
										locale="fi"
										selected={new Date(startDate)}
										dateFormat="dd/MM/yyyy"
										onChange={(date) => {
											if (date) {
												setStartDate(date.toISOString().split("T")[0]);
											} else {
												setStartDate(""); // Optionally handle the case when the date is cleared (null or undefined)
											}
										}}
									></DatePicker>
								</Col>
							</Row>
						</div>
					</Col>
				);
			});
		} else {
			return Array.from([2]).map(() => {
				return (
					<Row>
						<Col md={12} lg={6}>
							<Placeholder className="w-100" animation="glow">
								<Placeholder
									style={{ height: "250px" }}
									bg="secondary"
									className="d-block mx-auto"
								/>
							</Placeholder>
						</Col>
						<Col md={12} lg={6}>
							<Placeholder className="w-100" animation="glow">
								<Placeholder
									style={{ height: "250px" }}
									bg="secondary"
									className="d-block mx-auto"
								/>
							</Placeholder>
						</Col>
					</Row>
				);
			});
		}
	};

	return (
		<Container
			className="py-5"
			fluid
			style={{ backgroundColor: darkMode ? "#263062" : "#77b1d4" }}
		>
			<Container className="">
				<h2 className="text-center">Tarjousliput</h2>
				<Row className=" my-1  g-5  gx-5  ">{mapTimetables()}</Row>
			</Container>
		</Container>
	);
};

export default Offers;
