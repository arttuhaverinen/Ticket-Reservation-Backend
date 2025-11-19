import React, { useState, useContext, useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { Appcontext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import StripeContainer from "./StripeContainer";
import Maps from "./Maps";
import WeatherInfo from "./WeatherInfo";

interface Itimetable {
	id: number;
	day: string;
	departure: string;
	destination: string;
	startTime: string;
	endTime: string;
	price: number;
	seats: string[];
	priceDiscount: number | null;
}

const Orders = () => {
	let baseurl = "";
	if (import.meta.env.VITE_BASEURL) {
		baseurl = import.meta.env.VITE_BASEURL;
	} else {
		baseurl = "http://localhost:5001";
	}
	//let baseurl: string = import.meta.env.VITE_BASEURL;
	//const location = useLocation();
	const [timetable, setTimetable] = useState<Itimetable | null>(null);
	//console.log(JSON.stringify(timetable));
	//const seats = Array.from({ length: 20 }, (_, i) => i + 1);

	const [searchParams] = useSearchParams();

	let departure = searchParams.get("departure");
	let destination = searchParams.get("destination");
	let date = searchParams.get("date");
	let time = searchParams.get("time");
	let day = date ? new Date(date?.toString()) : null;
	const [noNameError, setNoNameError] = useState(false);
	console.log("day", day);
	const dayNames = [
		"Sunnuntai",
		"Maanantai",
		"Tiistai",
		"Keskiviikko",
		"Torstai",
		"Perjantai",
		"Lauantai" /* , … */,
	];
	//console.log(dayNames[day.getDay()]);

	//const [seatBtnOpacity, setSeatBtnOpacity] = useState(0.75);
	const [seatClicked, setSeatClicked] = useState<string | null>();
	const [reservedSeats, setReservedSeats] = useState<string[]>([]);
	const [notFound, setNotFound] = useState(false);

	const { appToken } = useContext(Appcontext)!;

	const [customerName, setCustomerName] = useState("");
	//const [customerInfo, setCustomerInfo] = useState();

	const cityLocations = {
		Joensuu: [62.601, 29.7636],
		Nurmes: [63.5421, 29.1391],
		Tampere: [61.4978, 23.761],
		Kuopio: [62.8924, 27.677],
	};

	const [weather, setWeather] = useState(null);
	const [toCityWeather, setToCityWeather] = useState(null);

	useEffect(() => {
		//let id = timetable.id.toString();
		console.log(
			`${baseurl}/api/Timetables/${departure}/${destination}/${date}/${time}`
		);
		fetch(
			`${baseurl}/api/Timetables/${departure}/${destination}/${date}/${time}`
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.length === 0) {
					console.log("The array is empty.");
					setNotFound(true);
				} else {
					console.log("res", res);
					console.log(res[0].seats);
					setReservedSeats(res[0].seats);
					setTimetable(res[0]);
				}

				/*res.map(
					(timetable) =>
						!reservedSeats.includes(timetable.seat) &&
						setReservedSeats(reservedSeats.concat(ticket.seat))
				);*/
			});
	}, []);

	useEffect(() => {
		if (timetable) {
			let coordinates = cityLocations[timetable.departure];
			//console.log("tt", timetables[0].departure);
			fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&current_weather=true`
			)
				.then((res) => res.json())
				.then((data) => setWeather(data))
				.catch((err) => console.log(err));
		}
		if (timetable) {
			let coordinates = cityLocations[timetable.destination];
			//console.log("tt", timetables[0].departure);
			fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&current_weather=true`
			)
				.then((res) => res.json())
				.then((data) => setToCityWeather(data))
				.catch((err) => console.log(err));
		}
	}, [timetable]);

	/*
	const handleCreateOrder = (e) => {
		e.preventDefault();
		fetch(`${baseurl}/api/Tickets`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${appToken}`,
			},
			body: JSON.stringify({
				startTime: timetable.startTime,
				endTime: timetable.endTime,
				date: timetable.startTime,
				expired: false,
				departure: timetable.departure,
				destination: timetable.destination,
				name: appUserName,
				seat: seatClicked,
				timetablesId: timetable.id.toString(),
				appUserId: appToken,
			}),
		})
			.then((res) => res.json())
			//.then((res) => /*console.log(res))
			.catch((err) => console.log(err));
	};
	*/
	const seatButton = {
		width: "40%",
		borderRadius: "0px",
		margin: "2px",
		backgroundColor: "",
		opacity: 0.5,
	};
	const seatButtonClicked = {
		width: "40%",
		borderRadius: "0px",
		margin: "2px",
		backgroundColor: "",
		opacity: 1,
		border: "1px solid black",
	};

	const seatButtonGray = {
		width: "40%",
		borderRadius: "0px",
		margin: "2px",
		backgroundColor: "gainsboro",
		opacity: 1,
		pointerEvents: "none",
	};

	/*
	const handleSeatBtnOpacity = (e) => {
		e.preventDefault();
		//console.log("handleseatbtnopacity");
		if (e.target.value == seatClicked) {
			e.target.style.opacity = 1;
		} else {
			e.target.style.opacity = 0.75;
		}
	};
	*/
	const handleButtonStyling = (num: number) => {
		console.log(reservedSeats, num);
		console.log("seat clicked", seatClicked);
		if (reservedSeats.includes(num.toString())) {
			console.log("gray ", num);
			return seatButtonGray;
		} else if (seatClicked == num.toString()) {
			console.log("seat was clicked");
			return seatButtonClicked;
		} else {
			return seatButton;
		}
	};

	return (
		<Container>
			{!timetable && notFound == false && (
				<Row className="my-3">
					<Spinner
						className="mx-auto"
						style={{ width: "4rem", height: "4rem" }}
						animation="border"
						role="status"
					>
						<span className="visually-hidden">Ladataan aikatauluja...</span>
					</Spinner>
					<h3 className="">Ladataan aikatauluja...</h3>
				</Row>
			)}
			{notFound == true && (
				<Row className="my-5 w-50 mx-auto">
					<h3 className="w-100 text-center">Matkoja ei löytynyt.</h3>
					<Link className="w-100" to="/">
						<Button className="w-100 btn btn-primary">
							Palaa takaisin etusivulle
						</Button>
					</Link>
				</Row>
			)}

			{reservedSeats && timetable && day && (
				<div data-testid="Orders">
					<Row className="mx-1 my-5 justify-content-between shadow p-3 mb-5 gray-div rounded">
						<Col className="d-flex" xs={3}>
							<p className="">
								{timetable.departure} <hr /> {timetable.destination}
							</p>
						</Col>
						<Col className="d-flex" xs={6}>
							<p className="mx-auto text-center">
								{date} <br /> {timetable.startTime} <br />{" "}
								{dayNames[day.getDay()]}
							</p>
						</Col>
						<Col className="d-flex flex-column" xs={3}>
							{timetable.priceDiscount ? (
								<s>
									<h2 className="mx-auto">{timetable.price}€</h2>
								</s>
							) : (
								<h2 className="mx-auto">{timetable.price}€</h2>
							)}

							{timetable.priceDiscount && (
								<h2 className="">{timetable.priceDiscount}€</h2>
							)}
						</Col>
					</Row>
					<Row className="my-5 mx-1 justify-content-between">
						<Col className="p-5 shadow p-3 mb-3 gray-div rounded" xs={5}>
							<div className="w-100">
								<p className="text-center">{timetable.departure}</p>{" "}
							</div>
							<div className="w-100">
								<p className="text-center">{timetable.startTime}</p>{" "}
							</div>
							{weather && toCityWeather && (
								<div className="w-100 d-flex justify-content-center">
									<WeatherInfo
										weathercode={weather.current_weather.weathercode}
										temperature={weather.current_weather.temperature}
									/>
								</div>
							)}
						</Col>
						<Col className="h-100 d-flex p-3 align-items-center " xs={2}>
							<FontAwesomeIcon
								className="my-5 mx-auto "
								icon={faArrowRightLong}
								size="2x"
								style={{ opacity: "0.8" }}
							/>
						</Col>
						<Col className="p-5  shadow p-3 mb-3 gray-div rounded" xs={5}>
							<div className="w-100">
								<div className="w-100">
									<p className="text-center">{timetable.destination}</p>
								</div>
								<div className="w-100">
									{" "}
									<p className="text-center">{timetable.endTime}</p>
								</div>
							</div>
							<div className="w-100">{timetable.endTime.slice(11, 16)} </div>
							{weather && toCityWeather && (
								<div className="w-100 d-flex justify-content-center">
									<WeatherInfo
										weathercode={toCityWeather.current_weather.weathercode}
										temperature={toCityWeather.current_weather.temperature}
									/>
								</div>
							)}
						</Col>
					</Row>
					<div className="border mb-5" style={{ height: "250px" }}>
						<Maps
							zoom={null}
							fromCity={timetable.departure}
							toCity={timetable.destination}
						/>
					</div>
					<Row>
						{/*
				<Col className="p-2 my-1 border border-dark" xs={12}>
					Vaihdot: 2
				</Col>
			*/}
					</Row>
					<Row className="h-100  gx-5 gy-5 justify-content-between">
						<Col className="" xs={12} md={6}>
							<div className="h-100 cornered justify-content-center shadow p-3 gray-div rounded">
								<h5 className="">Paikanvaraus</h5>
								<Row className="p-0 m-0 justify-content-center  ">
									<hr />
									<Col className="" xs={4}>
										{" "}
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "1"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(1)}
											value={1}
										>
											1
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "2"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(2)}
											value={2}
										>
											2
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "5"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(5)}
											value={5}
										>
											5
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "6"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(6)}
											value={6}
										>
											6
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "9"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(9)}
											value={9}
										>
											9
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "10"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(10)}
											value={10}
										>
											10
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "13"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(13)}
											value={13}
										>
											13
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "14"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(14)}
											value={14}
										>
											14
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "17"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(17)}
											value={17}
										>
											17
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "18"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(18)}
											value={18}
										>
											18
										</Button>
									</Col>
									<Col className="m-0 p-0" xs={1}></Col>
									<Col className="m-0 p-0" xs={4}>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "3"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(3)}
											value={3}
										>
											3
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "4"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(4)}
											value={4}
										>
											4
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "7"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(7)}
											value={7}
										>
											7
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "8"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(8)}
											value={8}
										>
											8
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "11"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(11)}
											value={11}
										>
											11
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "12"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(12)}
											value={12}
										>
											12
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "15"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(15)}
											value={15}
										>
											15
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "16"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(16)}
											value={16}
										>
											16
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "19"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(19)}
											value={19}
										>
											19
										</Button>
										<Button
											onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
												seatClicked == "20"
													? setSeatClicked(null)
													: setSeatClicked(e.currentTarget.value);
											}}
											style={handleButtonStyling(20)}
											value={20}
										>
											20
										</Button>
									</Col>
								</Row>
							</div>
						</Col>
						<Col className="" xs={12} md={6}>
							<div className="h-100 cornered justify-content-center gray-div shadow p-3  rounded">
								<h5>Asiakkaan tiedot</h5>
								<hr />
								<Form>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Sähköposti</Form.Label>{" "}
										{noNameError && customerName.length == 0 && (
											<Form.Label className="text-bg-danger">
												Tämä kenttä on pakollinen!
											</Form.Label>
										)}
										<Form.Control
											onChange={(e) => setCustomerName(e.target.value)}
											type="email"
											placeholder=""
										/>
										<Form.Text className="text-muted"></Form.Text>
									</Form.Group>
									<Form.Group className="mb-2" controlId="formBasicPassword">
										<Form.Label>Muut tiedot</Form.Label>
										<Form.Control type="" placeholder="" />
									</Form.Group>
									{/*
							<Button
								onClick={(e) => handleCreateOrder(e)}
								className="w-100 m-0"
								variant="primary"
								type="submit"
							>
								Vahvista tilaus
		</Button>*/}
								</Form>
								{date && (
									<StripeContainer
										ticket={{
											startTime: timetable.startTime,
											endTime: timetable.endTime,
											date: date,
											expired: false,
											departure: timetable.departure,
											destination: timetable.destination,
											name: customerName,
											seat: Number(seatClicked),
											timetablesId: timetable.id.toString(),
											appUserId: appToken,
										}}
										noNameError={noNameError}
										setNoNameError={setNoNameError}
									/>
								)}
							</div>
						</Col>
					</Row>
				</div>
			)}
		</Container>
	);
};

export default Orders;

/*
				startTime: timetable.startTime,
				endTime: timetable.endTime,
				date: timetable.startTime,
				expired: false,
				departure: timetable.departure,
				destination: timetable.destination,
				name: appUserName,
				seat: seatClicked,
				timetablesId: timetable.id.toString(),
				appUserId: appToken,
*/
