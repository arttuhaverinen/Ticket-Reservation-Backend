import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

export const Search = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [departureLocation, setDepartureLocation] = useState("Joensuu");
	const [destinationLocation, setDestinationLocation] = useState("Joensuu");
	const [startDate, setStartDate] = useState<string | undefined>(
		new Date().toJSON().split("T")[0]
	);

	return (
		<div className="w-100 my-3">
			{console.log(startDate)}
			<Form className="w-100 mx-auto p-2 shadow p-3 mb-5 bg-white rounded">
				<Row>
					<Col md={6}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Lähtö</Form.Label>
							<Form.Select
								onChange={(e) => setDepartureLocation(e.target.value)}
								aria-label="Default select example"
							>
								<option value="Joensuu">Joensuu</option>
								<option value="Kuopio">Kuopio</option>
								<option value="Nurmes">Nurmes</option>
								<option value="Tampere">Tampere</option>
							</Form.Select>
							<Form.Text className="text-muted"></Form.Text>
						</Form.Group>
					</Col>
					<Col md={6} lg={6}>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Kohde</Form.Label>
							<Form.Select
								onChange={(e) => setDestinationLocation(e.target.value)}
								aria-label="Default select example"
							>
								<option value="Joensuu">Joensuu</option>
								<option value="Kuopio">Kuopio</option>
								<option value="Nurmes">Nurmes</option>
								<option value="Tampere">Tampere</option>
							</Form.Select>
						</Form.Group>
					</Col>
					<Col md={8} lg={6}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Päivämäärä</Form.Label>
							<br />
							<DatePicker
								className="datepicker"
								locale="fi"
								selected={startDate}
								dateFormat="dd/MM/yyyy"
								onChange={(date) =>
									//setStartDate(date?.toISOString().split("T")[0])
									setStartDate(date?.toJSON().split("T")[0])
								}
							></DatePicker>
						</Form.Group>
					</Col>
					<Col sm={12} md={4} lg={5} className="d-flex align-items-center">
						<Link
							className="w-100"
							to={"/tickets"}
							state={{
								departureLocation: departureLocation,
								destinationLocation: destinationLocation,
							}}
						>
							{" "}
							<Link
								to={`tickets?departure=${departureLocation}&destination=${destinationLocation}&date=${startDate}`}
							>
								<Button className="w-100" variant="primary">
									haku
								</Button>
							</Link>
						</Link>
					</Col>
				</Row>
			</Form>
		</div>
	);
};
