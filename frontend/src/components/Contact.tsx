import React from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

const Contact = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;

	const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch(`${baseurl}/api/Email/send`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				recipientEmail: "haverinen994@gmail.com",
				subject: "test",
				body: "test customer support",
			}),
		}).then((res) => console.log(res));
	};

	return (
		<div className="w-75 mx-auto my-5 shadow p-3 mb-5 gray-div rounded">
			<Row>
				<Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => sendEmail(e)}>
					<h3 className="text-center">
						Tällä lomakkeella voit ottaa meihin yhteyttä sähköpostitse.
					</h3>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Sähköposti</Form.Label>
						<Form.Control type="email" placeholder="Sähköposti" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Otsikko</Form.Label>
						<Form.Control placeholder="Viestisi aihe" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Viesti</Form.Label>
						<Form.Control as="textarea" rows="10" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Lähetä sähköposti
					</Button>
				</Form>
			</Row>
		</div>
	);
};

export default Contact;
