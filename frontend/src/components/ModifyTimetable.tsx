import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const ModifyTimetable = () => {
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
	const [destination, setDestination] = useState<string | null>();
	const [departure, setDeparture] = useState<string | null>();
	const [startTime, setStartTime] = useState<string | null>();
	const [endTime, setEndTime] = useState<string | null>();
	const [price, setPrice] = useState<string | null>();
	const [priceDiscount, setPriceDiscount] = useState<string | null>();
	const [monday, setMonday] = useState(false);
	const [tuesday, setTuesday] = useState(false);
	const [wednesday, setWednesday] = useState(false);
	const [thursday, setThursday] = useState(false);
	const [friday, setFriday] = useState(false);
	const [saturday, setSaturday] = useState(false);
	const [sunday, setSunday] = useState(false);

	const [searchParams] = useSearchParams();
	const [timetable, setTimetable] = useState<timetableInterface>();

	let timetableId = searchParams.get("Timetable");

	useEffect(() => {
		fetch(`${baseurl}/api/Timetables/${timetableId}`)
			.then((res) => res.json())
			.then((data) => {
				setTimetable(data);
				setDestination(data.destination);
				setDeparture(data.departure);
				setStartTime(data.startTime);
				setEndTime(data.endTime);
				setPrice(data.price);
				setPriceDiscount(data.priceDiscount);
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

	const mapTimetablesMobile = () => {
		if (timetable) {
			return (
				<div className="card gray-div mb-3" key={timetable.id}>
					<div className="card-body">
						<h5 className="card-title">
							{timetable.departure} → {timetable.destination}
						</h5>
						<p>
							<strong>Lähtöaika:</strong> {timetable.startTime}
						</p>
						<p>
							<strong>Saapumisaika:</strong> {timetable.endTime}
						</p>
						<p>
							<strong>Hinta:</strong>{" "}
							{timetable.priceDiscount ? (
								<>
									<s>{timetable.price}</s> | {timetable.priceDiscount}
								</>
							) : (
								timetable.price
							)}
						</p>
						<p>
							<strong>Ajopäivät:</strong> {timetable.day.toString()}
						</p>
					</div>
				</div>
			);
		}
	};

	const mapTimetables = () => {
		if (timetable) {
			console.log(timetable);
			return (
				<tr key={timetable.id}>
					<td>{timetable.departure}</td>
					<td>{timetable.destination}</td>
					<td>{timetable.startTime}</td>
					<td>{timetable.endTime}</td>
					<td>{timetable.price}</td>
					<td>{timetable.day.toString()}</td>
				</tr>
			);
		}
	};

	const handleCreateTimetable = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let days = [
			...(monday ? ["monday"] : []),
			...(tuesday ? ["tuesday"] : []),
			...(wednesday ? ["wednesday"] : []),
			...(thursday ? ["thursday"] : []),
			...(friday ? ["friday"] : []),
			...(saturday ? ["saturday"] : []),
			...(sunday ? ["sunday"] : []),
		];
		console.log(
			startTime,
			endTime,
			price,
			departure,
			destination,
			days,
			localStorage.getItem("accesstoken")
		);

		fetch(`${baseurl}/api/Timetables/${timetable?.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
			},
			body: JSON.stringify({
				StartTime: startTime,
				EndTime: endTime,
				Price: price,
				Departure: departure,
				Destination: destination,
				Day: days,
			}),
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
	};

	return (
		<div className=" mx-auto my-5 shadow p-3 mb-5 gray-div  rounded">
			{timetable ? (
				<>
					<h3>Muokattava ajovuoro</h3>
					<div className="d-block  d-lg-none">{mapTimetablesMobile()}</div>
					<Table
						className="d-none d-lg-block table-responsive mx-auto"
						striped
						bordered
						hover
					>
						<thead>
							<tr>
								<th>Lähtö</th>
								<th>Kohde</th>
								<th>Lähtöaika</th>
								<th>Saapumisaika</th>
								<th>Hinta</th>
								<th>Ajopäivät</th>
							</tr>
						</thead>
						<tbody>{mapTimetables()}</tbody>
					</Table>

					<h3>Valitse muokattavat tiedot</h3>
					<Form
						onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
							handleCreateTimetable(e)
						}
					>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Lähtö</Form.Label>
							<Form.Control
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setDeparture(e.target.value)
								}
								type=""
								defaultValue={timetable && timetable.departure}
							/>
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="">
							<Form.Label>Kohde</Form.Label>
							<Form.Control
								onChange={(e) => setDestination(e.target.value)}
								type=""
								defaultValue={timetable && timetable.destination}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Lähtöaika</Form.Label>
							<Form.Control
								onChange={(e) => setStartTime(e.target.value)}
								type=""
								placeholder="Lähtöaika"
								defaultValue={timetable && timetable.startTime}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Saapumisaika</Form.Label>
							<Form.Control
								onChange={(e) => setEndTime(e.target.value)}
								type=""
								placeholder="Saapumisaika"
								defaultValue={timetable && timetable.endTime}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Hinta</Form.Label>
							<Form.Control
								onChange={(e) => setPrice(e.target.value)}
								type=""
								placeholder="20.00"
								defaultValue={timetable && timetable.price}
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Alennettu hinta</Form.Label>
							<Form.Control
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPrice(e.target.value)
								}
								type=""
								placeholder="15.00"
							/>
						</Form.Group>
						<h5>Ajopäivät</h5>

						<Form.Check
							type="checkbox"
							label="Maanantai"
							name="checkboxGroup"
							id="option1"
							onChange={() => setMonday(!monday)}
							defaultChecked={timetable && monday}
						/>
						<Form.Check
							type="checkbox"
							label="Tiistai"
							name="checkboxGroup"
							id="option1"
							onChange={() => setTuesday(!tuesday)}
							defaultChecked={timetable && tuesday}
						/>
						<Form.Check
							type="checkbox"
							label="Keskiviikko"
							name="checkboxGroup"
							id="option1"
							onChange={() => setWednesday(!wednesday)}
							defaultChecked={timetable && wednesday}
						/>
						<Form.Check
							type="checkbox"
							label="Torstai"
							name="checkboxGroup"
							id="option1"
							onChange={() => setThursday(!thursday)}
							defaultChecked={timetable && thursday}
						/>
						<Form.Check
							type="checkbox"
							label="Perjantai"
							name="checkboxGroup"
							id="option1"
							onChange={() => setFriday(!friday)}
							defaultChecked={timetable && friday}
						/>
						<Form.Check
							type="checkbox"
							label="Lauantai"
							name="checkboxGroup"
							id="option1"
							onChange={() => setSaturday(!saturday)}
							defaultChecked={timetable && saturday}
						/>
						<Form.Check
							type="checkbox"
							label="Sunnuntai"
							name="checkboxGroup"
							id="option1"
							onChange={() => setSunday(!sunday)}
							defaultChecked={timetable && sunday}
						/>
						<hr />
						<Button className="w-100" variant="primary" type="submit">
							Päivitä ajovuoro
						</Button>
					</Form>
					{/*defaultValue={timetable && timetable.priceDiscount}*/}
				</>
			) : (
				<>
					{" "}
					<h1>ladataan ajovuoroa</h1>
				</>
			)}
		</div>
	);
};

export default ModifyTimetable;
