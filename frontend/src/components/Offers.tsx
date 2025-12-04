import { useEffect, useState, useContext } from "react";
import {
	Button,
	Col,
	Container,
	FormControl,
	InputGroup,
	Placeholder,
	Row,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { Appcontext } from "../App";
import Maps from "./Maps";

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
	const [searchWord, setSearchWord] = useState("");

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

	const translateDaysToFinnish = (days: string[]): string[] => {
		let finnishDays = [];
		let daysToString = days.toString();
		console.log("days to string", daysToString);
		daysToString = daysToString.replaceAll(" ", "");
		let commaSeparatedDays = daysToString.split(",");
		console.log("commasep", commaSeparatedDays);

		if (commaSeparatedDays.includes("monday")) {
			finnishDays.push("maanantai");
		}
		if (commaSeparatedDays.includes("tuesday")) {
			finnishDays.push("tiistai");
		}
		if (commaSeparatedDays.includes("wednesday")) {
			finnishDays.push("keskiviikko");
		}
		if (commaSeparatedDays.includes("thursday")) {
			finnishDays.push("torstai");
		}
		if (commaSeparatedDays.includes("friday")) {
			finnishDays.push("perjantai");
		}
		if (commaSeparatedDays.includes("saturday")) {
			finnishDays.push("lauantai");
		}
		if (commaSeparatedDays.includes("sunday")) {
			finnishDays.push("sunnuntai");
		}

		while (finnishDays.length < 7) {
			finnishDays.push("-");
		}

		return finnishDays;
	};

	const mapTimetables = () => {
		console.log(timetables);
		let hidden = false;
		if (timetables) {
			return timetables.map((tt) => {
				{
					if (
						searchWord.length == 0 ||
						tt.departure.toLowerCase().includes(searchWord.toLowerCase()) ||
						tt.destination.toLowerCase().includes(searchWord.toLowerCase())
					) {
						{
							console.log("hidden", hidden);
						}
						hidden = false;
					} else {
						{
							console.log("hidden", hidden);
						}

						hidden = true;
					}
					return (
						<>
							<Col
								className={`${hidden ? "d-none" : "d-block"}`}
								md={12}
								lg={6}
							>
								<div className="h-100 gray-div  rounded p-3">
									<Row>
										<Col className="" md={6}>
											<h5 className=" text-center">
												{tt.departure} → {tt.destination}
											</h5>
											<div className="card gray-div mb-3 p-3" key={tt.id}>
												<div className="">
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
												</div>
											</div>
										</Col>
										<Col md={6}>
											{" "}
											<div className="d-flex flex-column">
												<h5 className="p-0 text-center">Ajopäivät:</h5>
												<ul className="list-group">
													{translateDaysToFinnish(tt.day).map((day) => {
														if (day == "-") {
															return (
																<li className="list-group-item border-0">
																	<h6>&nbsp;</h6>{" "}
																</li>
															);
														} else {
															return (
																<li className="list-group-item">
																	<h6>{day}</h6>{" "}
																</li>
															);
														}
													})}
												</ul>
											</div>
										</Col>
									</Row>
									<hr />
									<Row className="my-3">
										{/** <!-- justify-content-center --> */}
										<Col xs={12}>
											<div className="my-3" style={{ height: "250px" }}>
												{" "}
												<Maps
													zoom={null}
													fromCity={tt.departure}
													toCity={tt.destination}
												/>
											</div>
										</Col>
										<Col xs={3} sm={6} className="d-flex align-items-center">
											<Link
												className="text-center ms-1 btn btn-primary"
												to={`/orders?departure=${tt.departure}&destination=${tt.destination}&date=${startDate}&time=${tt.startTime}`}
											>
												Osta
											</Link>
										</Col>
										<Col xs={9} sm={6} className="">
											<span>Päivämäärä </span>
											<DatePicker
												className="datepicker w-100"
												locale="fi"
												withPortal
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
						</>
					);
				}
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
				<h2 className="text-center mb-3">Tarjousmatkat</h2>
				<div className="w-100 d-flex justify-conent-center ">
					<InputGroup className="blue-border-input">
						<FormControl
							className="border-0 shadow-none"
							placeholder="Hae tarjousmatkoja paikkakunnan perusteella"
							aria-label="Search"
							onChange={(e) => setSearchWord(e.target.value)}
						/>
						<InputGroup.Text className="border-0 search-icon">
							<i
								className="fa fa-search fa-search-custom fa-4x"
								aria-hidden="true"
							></i>
						</InputGroup.Text>
					</InputGroup>
				</div>
				<Row className=" my-1  g-5  gx-5  ">{mapTimetables()}</Row>
			</Container>
		</Container>
	);
};

export default Offers;
