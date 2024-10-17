import React, { useState, useContext, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { json, useLocation, useSearchParams } from "react-router-dom";
import { Appcontext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faArrowRight,
	faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import StripeContainer from "./StripeContainer";

interface Itimetable {
	day: string;
	departure: string;
	destination: string;
	startTime: string;
	endTime: string;
	price: number;
	seats: string[];
}

const Orders = (props) => {
	let baseurl = "";
	if (import.meta.env.VITE_BASEURL) {
		baseurl = import.meta.env.VITE_BASEURL;
	} else {
		baseurl = "http://localhost:5001";
	}
	//let baseurl: string = import.meta.env.VITE_BASEURL;
	const location = useLocation();
	const [timetable, setTimetable] = useState();
	//console.log(JSON.stringify(timetable));
	const seats = Array.from({ length: 20 }, (_, i) => i + 1);

	const [searchParams] = useSearchParams();

	let departure = searchParams.get("departure");
	let destination = searchParams.get("destination");
	let date = searchParams.get("date");
	let time = searchParams.get("time");
	let day = new Date(date?.toString());
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
	console.log(dayNames[day.getDay()]);

	const [seatBtnOpacity, setSeatBtnOpacity] = useState(0.75);
	const [seatClicked, setSeatClicked] = useState<number | null>();
	const [reservedSeats, setReservedSeats] = useState();

	const { appToken, appUserName } = useContext(Appcontext);

	const [customerName, setCustomerName] = useState("");
	const [customerInfo, setCustomerInfo] = useState();

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
				console.log(res[0].seats);
				setReservedSeats(res[0].seats);
				setTimetable(res[0]);
				/*res.map(
					(timetable) =>
						!reservedSeats.includes(timetable.seat) &&
						setReservedSeats(reservedSeats.concat(ticket.seat))
				);*/
			});
	}, []);

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
			//.then((res) => /*console.log(res)*/)
			.catch((err) => console.log(err));
	};

	const seatButton = {
		width: "40%",
		borderRadius: "0px",
		margin: "2px",
		backgroundColor: "",
		opacity: 0.5,
		textOpacity: 1,
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

	const handleSeatBtnOpacity = (e) => {
		e.preventDefault();
		//console.log("handleseatbtnopacity");
		if (e.target.value == seatClicked) {
			e.target.style.opacity = 1;
		} else {
			e.target.style.opacity = 0.75;
		}
	};

	const handleButtonStyling = (num) => {
		console.log(reservedSeats, num);
		if (reservedSeats.includes(num.toString())) {
			return seatButtonGray;
		} else if (seatClicked == num) {
			return seatButtonClicked;
		} else {
			return seatButton;
		}
	};

	return (
		<div>
			{reservedSeats ? (
				<div data-testid="Orders">
					<Row className="mx-1 my-5 justify-content-between shadow p-3 mb-5 bg-white rounded">
						<Col className="d-flex" xs={3}>
							<p className="mx-auto">
								{timetable.departure} <br /> {timetable.destination}
							</p>
						</Col>
						<Col className="d-flex" xs={6}>
							<p className="mx-auto text-center">
								{date} <br /> {timetable.startTime} <br />{" "}
								{dayNames[day.getDay()]}
							</p>
						</Col>
						<Col className="d-flex" xs={3}>
							<h2 className="mx-auto">{timetable.price}€</h2>
						</Col>
					</Row>
					<Row className="my-5 mx-1 justify-content-between">
						<Col className="p-5  shadow p-3 mb-5 bg-white rounded" xs={5}>
							<div className="w-100">{timetable.departure}</div>
							<div className="w-100">{timetable.startTime}</div>
						</Col>
						<Col className="h-100 d-flex p-3 align-items-center " xs={2}>
							<FontAwesomeIcon
								className="my-5 mx-auto "
								icon={faArrowRightLong}
								size="2x"
								style={{ opacity: "0.8" }}
							/>
						</Col>
						<Col className="p-5  shadow p-3 mb-5 bg-white rounded" xs={5}>
							{" "}
							<div className="w-100">
								<div className="w-100">{timetable.destination}</div>
								<div className="w-100">{timetable.endTime}</div>
							</div>
							<div className="w-100">{timetable.endTime.slice(11, 16)} </div>
						</Col>
					</Row>
					<Row>
						{/*
				<Col className="p-2 my-1 border border-dark" xs={12}>
					Vaihdot: 2
				</Col>
			*/}
					</Row>
					<Row className="h-100  gx-5 gy-5 justify-content-between">
						<Col className="" xs={12} md={6}>
							<div className="h-100 cornered justify-content-center shadow p-3 bg-white rounded">
								<h5 className="">Paikanvaraus</h5>
								<Row className="p-0 m-0 justify-content-center  ">
									<hr />
									<Col className="" xs={4}>
										{" "}
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(1)}
											value={1}
										>
											1
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(2)}
											value={2}
										>
											2
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(5)}
											value={5}
										>
											5
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(6)}
											value={6}
										>
											6
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(9)}
											value={9}
										>
											9
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(10)}
											value={10}
										>
											10
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(13)}
											value={13}
										>
											13
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(14)}
											value={14}
										>
											14
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(17)}
											value={17}
										>
											17
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(18)}
											value={17}
										>
											18
										</Button>
									</Col>
									<Col className="m-0 p-0" xs={1}></Col>
									<Col className="m-0 p-0" xs={4}>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(3)}
											value={3}
										>
											3
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(4)}
											value={4}
										>
											4
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(7)}
											value={7}
										>
											7
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(8)}
											value={8}
										>
											8
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(11)}
											value={11}
										>
											11
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(12)}
											value={12}
										>
											12
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(15)}
											value={15}
										>
											15
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(16)}
											value={16}
										>
											16
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
											style={handleButtonStyling(19)}
											value={19}
										>
											18
										</Button>
										<Button
											onClick={(e) => setSeatClicked(e.target.value)}
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
							<div className="h-100 cornered justify-content-center shadow p-3 bg-white rounded">
								<h5>Asiakkaan tiedot</h5>
								<hr />
								<Form>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Label>Nimi</Form.Label>
										<Form.Control
											onChange={(e) => setCustomerName(e.target.value)}
											type="email"
											placeholder=""
										/>
										<Form.Text className="text-muted"></Form.Text>
									</Form.Group>
									<Form.Group className="mb-2" controlId="formBasicPassword">
										<Form.Label>Muut tiedot</Form.Label>
										<Form.Control type="password" placeholder="" />
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
								<StripeContainer
									startTime={timetable.startTime}
									endTime={timetable.endTime}
									date={date}
									expired={false}
									departure={timetable.departure}
									destination={timetable.destination}
									name={customerName}
									seat={seatClicked}
									timetablesId={timetable.id.toString()}
									appUserId={appToken}
								/>
							</div>
						</Col>
					</Row>
				</div>
			) : (
				<h1>loading</h1>
			)}
		</div>
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
