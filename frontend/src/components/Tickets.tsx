import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Tickets = () => {
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
	const mobileScreen = useMediaQuery({ query: "(max-width: 768px)" });
	let baseurl = "";
	if (import.meta.env.VITE_BASEURL) {
		baseurl = import.meta.env.VITE_BASEURL;
	} else {
		console.log("baseurl was undefined");
		baseurl = "http://localhost:5001";
	}

	/*
	const location = useLocation();
	const { departureLocation } = location.state;
	const { destinationLocation } = location.state;
	*/
	const [searchParams] = useSearchParams();

	let departure = searchParams.get("departure");
	let destination = searchParams.get("destination");
	let date = searchParams.get("date");

	const [timetables, setTimetables] = useState<timetableInterface[] | null>(
		null
	);

	useEffect(() => {
		console.log(
			`${baseurl}/api/Timetables/${departure}/${destination}/${date}`
		);

		fetch(`${baseurl}/api/Timetables/${departure}/${destination}/${date}`)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setTimetables(res);
			});
		//				//
	}, []);
	//http://localhost:5173/tickets?departure=Joensuu&destination=Nurmes&date=2024-12-26
	return (
		<Container>
			{!timetables && (
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
			{timetables?.length == 0 && (
				<Row className="my-5 w-50 mx-auto">
					<h3 className="w-100 text-center">Matkoja ei löytynyt.</h3>
					<Link className="w-100" to="/">
						<Button className="w-100 btn btn-primary">
							Palaa takaisin etusivulle
						</Button>
					</Link>
				</Row>
			)}

			<div>
				{mobileScreen && timetables && timetables?.length > 0 && (
					<>
						<Row data-testid="tickets-mobile-row" className="my-5">
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
						{timetables.map((timetable) => {
							return (
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
											data-testid="tickets-mobile-purchase-button"
											className="h-100 xs-auto"
											to={`/orders?departure=${departure}&destination=${destination}&date=${date}&time=${timetable.startTime}`}
											state={{ timetable: timetable }}
										>
											<Button className="w-100 h-100">
												<h6>Osta lippu</h6>
												{timetable.priceDiscount ? (
													<s className="mx-auto">{timetable.price}€</s>
												) : (
													<p className="mx-auto">{timetable.price}€</p>
												)}
												{timetable.priceDiscount && (
													<p>{timetable.priceDiscount}€</p>
												)}
											</Button>
										</Link>{" "}
									</Col>
								</Row>
							);
						})}
					</>
				)}
				{!mobileScreen && timetables && timetables?.length > 0 && (
					<>
						<Row data-testid="tickets-desktop-row" className="my-5">
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
						{timetables.map((timetable) => {
							return (
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
										{timetable.priceDiscount ? (
											<s className="mx-auto">{timetable.price}€</s>
										) : (
											<p className="mx-auto">{timetable.price}€</p>
										)}
										{timetable.priceDiscount && (
											<p>{timetable.priceDiscount}€</p>
										)}
									</Col>

									<Col className="" xs={3}>
										<Link
											data-testid="tickets-desktop-purchase-button"
											className="h-100 xs-auto"
											to={`/orders?departure=${departure}&destination=${destination}&date=${date}&time=${timetable.startTime}`}
											state={{ timetable: timetable }}
										>
											<Button className="w-100 h-100">Osta lippu</Button>
										</Link>{" "}
									</Col>
								</Row>
							);
						})}
						<hr></hr>
					</>
				)}
			</div>

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
		</Container>
	);
};

export default Tickets;
