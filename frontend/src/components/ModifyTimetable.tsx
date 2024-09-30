import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { setTime } from "react-datepicker/dist/date_utils";
import { Link, useSearchParams } from "react-router-dom";

const ModifyTimetable = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [destination, setDestination] = useState();
	const [departure, setDeparture] = useState();
	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();
	const [price, setPrice] = useState();
	const [days, setDays] = useState();
	const [priceDiscount, setPriceDiscount] = useState();
	const [monday, setMonday] = useState(false);
	const [tuesday, setTuesday] = useState(false);
	const [wednesday, setWednesday] = useState(false);
	const [thursday, setThursday] = useState(false);
	const [friday, setFriday] = useState(false);
	const [saturday, setSaturday] = useState(false);
	const [sunday, setSunday] = useState(false);

	const [searchParams] = useSearchParams();
	const [timetable, setTimetable] = useState();

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
					<td></td>
				</tr>
			);
		}
	};

	const handleCreateTimetable = (e) => {
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

		fetch(`${baseurl}/api/Timetables/${timetable.id}`, {
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
		<div className=" mx-auto my-5 shadow p-3 mb-5 bg-white rounded">
			{console.log("monday", monday, "tuesday", tuesday, departure)}
			<h3>Muokattava ajovuoro</h3>
			<Table striped bordered hover>
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

			{console.log(departure)}

			<h3>Valitse muokattavat tiedot</h3>
			<Form onSubmit={(e) => handleCreateTimetable(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Lähtö</Form.Label>
					<Form.Control
						onChange={(e) => setDeparture(e.target.value)}
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
						onChange={(e) => setPrice(e.target.value)}
						type=""
						placeholder="15.00"
						defaultValue={timetable && timetable.priceDiscount}
					/>
				</Form.Group>
				<h5>Ajopäivät</h5>

				<Form.Check
					type="checkbox"
					label="Maanantai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setMonday(!monday)}
					defaultChecked={timetable && monday}
				/>
				<Form.Check
					type="checkbox"
					label="Tiistai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setTuesday(!tuesday)}
					defaultChecked={timetable && tuesday}
				/>
				<Form.Check
					type="checkbox"
					label="Keskiviikko"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setWednesday(!wednesday)}
					defaultChecked={timetable && wednesday}
				/>
				<Form.Check
					type="checkbox"
					label="Torstai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setThursday(!thursday)}
					defaultChecked={timetable && thursday}
				/>
				<Form.Check
					type="checkbox"
					label="Perjantai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setFriday(!friday)}
					defaultChecked={timetable && friday}
				/>
				<Form.Check
					type="checkbox"
					label="Lauantai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setSaturday(!saturday)}
					defaultChecked={timetable && saturday}
				/>
				<Form.Check
					type="checkbox"
					label="Sunnuntai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setSunday(!sunday)}
					defaultChecked={timetable && sunday}
				/>
				<hr />
				<Button className="w-100" variant="primary" type="submit">
					Päivitä ajovuoro
				</Button>
			</Form>
		</div>
	);
};

export default ModifyTimetable;
