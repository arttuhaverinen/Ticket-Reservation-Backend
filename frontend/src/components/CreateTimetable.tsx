import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CreateTimetable = () => {
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

	const handleCreateTimetable = (e) => {
		e.preventDefault();
		let days = [
			...(monday ? ["monday"] : []),
			...(tuesday ? ["tuesday"] : []),
			...(wednesday ? ["tuesday"] : []),
			...(thursday ? ["tuesday"] : []),
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

		fetch(`${baseurl}/api/Timetables`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
			},
			body: JSON.stringify({
				StartTime: startTime,
				EndTime: endTime,
				Price: price,
				PriceDiscount: priceDiscount,
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
			{console.log(
				monday,
				tuesday,
				wednesday,
				thursday,
				friday,
				saturday,
				sunday
			)}
			<h3>Lisää uusi ajovuoro</h3>
			<Form onSubmit={(e) => handleCreateTimetable(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Lähtö</Form.Label>
					<Form.Control
						onChange={(e) => setDeparture(e.target.value)}
						type=""
						placeholder="Kaupunki"
					/>
					<Form.Text className="text-muted"></Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="">
					<Form.Label>Kohde</Form.Label>
					<Form.Control
						onChange={(e) => setDestination(e.target.value)}
						type=""
						placeholder="Kaupunki"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Lähtöaika</Form.Label>
					<Form.Control
						onChange={(e) => setStartTime(e.target.value)}
						type=""
						placeholder="Lähtöaika"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Saapumisaika</Form.Label>
					<Form.Control
						onChange={(e) => setEndTime(e.target.value)}
						type=""
						placeholder="Saapumisaika"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Hinta</Form.Label>
					<Form.Control
						onChange={(e) => setPrice(e.target.value)}
						type=""
						placeholder="20.00"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Alennettu hinta</Form.Label>
					<Form.Control
						onChange={(e) => setPriceDiscount(e.target.value)}
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
					onChange={(e) => setMonday(!monday)}
				/>
				<Form.Check
					type="checkbox"
					label="Tiistai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setTuesday(!tuesday)}
				/>
				<Form.Check
					type="checkbox"
					label="Keskiviikko"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setWednesday(!wednesday)}
				/>
				<Form.Check
					type="checkbox"
					label="Torstai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setThursday(!thursday)}
				/>
				<Form.Check
					type="checkbox"
					label="Perjantai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setFriday(!friday)}
				/>
				<Form.Check
					type="checkbox"
					label="Lauantai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setSaturday(!saturday)}
				/>
				<Form.Check
					type="checkbox"
					label="Sunnuntai"
					name="checkboxGroup"
					id="option1"
					onChange={(e) => setSunday(!sunday)}
				/>
				<hr />
				<Button className="w-100" variant="primary" type="submit">
					Lisää ajovuoro
				</Button>
			</Form>
		</div>
	);
};

export default CreateTimetable;
