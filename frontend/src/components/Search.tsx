import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

export const Search = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [departureLocation, setDepartureLocation] = useState("Joensuu");
	const [destinationLocation, setDestinationLocation] = useState("Nurmes");
	const [startDate, setStartDate] = useState<string | undefined>(
		new Date().toJSON().split("T")[0]
	);

	return (
		<Container className="w-100 my-3">
			<Form className="w-100 mx-auto p-2 shadow p-3 mb-5 bg-white rounded">
				<Row>
					<Col md={6}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Lähtö</Form.Label>
							<Form.Select
								onChange={(e) => setDepartureLocation(e.target.value)}
								aria-label="Default select example"
								value={departureLocation}
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
								value={destinationLocation}
							>
								<option value="Joensuu">Joensuu</option>
								<option value="Kuopio">Kuopio</option>
								<option value="Nurmes">Nurmes</option>
								<option value="Tampere">Tampere</option>
							</Form.Select>
						</Form.Group>
					</Col>
					<Col xs={12} sm={6} md={6} lg={6}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Päivämäärä</Form.Label>
							<br />
							<DatePicker
								className="datepicker w-100"
								locale="fi"
								selected={startDate as unknown as Date} // Workaround to fix typescript error
								dateFormat="dd/MM/yyyy"
								onChange={(date) =>
									//setStartDate(date?.toISOString().split("T")[0])
									setStartDate(date?.toJSON().split("T")[0])
								}
							></DatePicker>
						</Form.Group>
					</Col>
					<Col
						xs={12}
						sm={6}
						md={6}
						lg={6}
						className="d-flex align-items-center"
					>
						<Link
							className="w-100 "
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
								<Button className="w-100 h-75 p-2 my-auto" variant="primary">
									haku
								</Button>
							</Link>
						</Link>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};
