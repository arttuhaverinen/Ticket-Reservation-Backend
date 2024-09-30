import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Tickets = () => {
	const mobileScreen = useMediaQuery({ query: "(max-width: 768px)" });
	let baseurl: string = import.meta.env.VITE_BASEURL;
	/*
	const location = useLocation();
	const { departureLocation } = location.state;
	const { destinationLocation } = location.state;
	*/
	const [searchParams] = useSearchParams();

	let departure = searchParams.get("departure");
	let destination = searchParams.get("destination");
	let date = searchParams.get("date");

	const [timetables, setTimetables] = useState([]);
	const [startTime, setStartTime] = useState();

	useEffect(() => {
		console.log("fetching timetables");

		fetch(`${baseurl}/api/Timetables/${departure}/${destination}/${date}`)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setTimetables(res);
			});
	}, []);

	return (
		<div>
			{timetables &&
				timetables.map((timetable) => {
					return (
						<>
							{mobileScreen ? (
								<>
									<Row className="my-5">
										<Col className="d-flex " xs={4} lg={3}>
											<p className="mx-auto">lähtöaika / saapumisaika</p>
										</Col>
										<Col className="d-flex  " xs={4} lg={3}>
											<p className="mx-auto">
												lähtö / <br /> tulo
											</p>
										</Col>

										<Col className="d-flex" xs={4}>
											<p className="mx-auto">hinta</p>
										</Col>
									</Row>
									<hr></hr>
									<Row className=" my-5">
										<Col className=" py-3" xs={4}>
											<h6>
												{timetable.startTime} <br /> {timetable.endTime}{" "}
											</h6>
										</Col>
										<Col className="d-flex py-3" xs={4}>
											<h6 className="text-center mx-auto">
												{timetable.departure} <br /> {timetable.destination}
											</h6>
										</Col>
										{/*
									<Col className=" py-3" xs={6}>
										{timetable.price}
									</Col>
							*/}
										<Col className="" xs={4}>
											<Link
												className="h-100 xs-auto"
												to={`/orders?departure=${departure}&destination=${destination}&date=${date}&time=${timetable.startTime}`}
												state={{ timetable: timetable }}
											>
												<Button className="w-100 h-100">
													Osta lippu <br /> {timetable.price}€
												</Button>
											</Link>{" "}
										</Col>
									</Row>
								</>
							) : (
								<>
									<Row className="my-5">
										<Col className=" " xs={3}>
											<p className="">lähtöaika / saapumisaika</p>
										</Col>
										<Col className="  " xs={3}>
											<p className="">
												lähtö / <br /> tulo
											</p>
										</Col>

										<Col className="" xs={3}>
											<p className="">hinta</p>
										</Col>
									</Row>
									<hr />
									<Row className=" my-5">
										<Col className=" py-3" xs={3}>
											<h5>
												{timetable.startTime} - {timetable.endTime}{" "}
											</h5>
										</Col>
										<Col className="   py-3" xs={3}>
											{timetable.departure} - {timetable.destination}
										</Col>

										<Col className=" py-3" xs={3}>
											{timetable.price}€
										</Col>

										<Col className="" xs={3}>
											<Link
												className="h-100 xs-auto"
												to={`/orders?departure=${departure}&destination=${destination}&date=${date}&time=${timetable.startTime}`}
												state={{ timetable: timetable }}
											>
												<Button className="w-100 h-100">Osta lippu</Button>
											</Link>{" "}
										</Col>
									</Row>
									<hr></hr>
								</>
							)}
						</>
					);
				})}
			{/*
			<Row className="my-5">
				<Col className="bg-info border cornered" xs={3}>
					12.00 - 14.30
				</Col>
				<Col className="bg-info border cornered" xs={3}>
					Joensuu - Kuopio
				</Col>

				<Col className="bg-warning border cornered" xs={3}>
					25.00 €
				</Col>
				<Col className="" xs={3}>
					<Link to={"/orders"}>
						<Button className="w-100">Osta lippu</Button>
					</Link>
				</Col>
			</Row>
			*/}
		</div>
	);
};

export default Tickets;
