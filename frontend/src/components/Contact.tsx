import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import AlertMessage from "./AlertMessage";

const Contact = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;

	const [email, setEmail] = useState<null | string>(null);
	const [subject, setSubject] = useState<null | string>(null);
	const [body, setBody] = useState<null | string>(null);
	const [alert, setAlert] = useState(false);
	const [alertTheme, setAlertTheme] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch(`${baseurl}/api/Email/customer-support`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				recipientEmail: email,
				subject: subject,
				body: body,
			}),
		})
			.then((res) => {
				console.log(res);
				setAlert(true);
				setAlertMessage("Sähköposti lähetettiin onnistuneesti.");
				setAlertTheme("success");
			})
			.catch((err) => {
				console.log(err);
				setAlert(true);
				setAlertMessage("Sähköpostin lähettämisessä tapahtui virhe.");
				setAlertTheme("danger");
			});
	};

	return (
		<div className="w-75 mx-auto my-5 shadow p-3 mb-5 gray-div rounded">
			{alert && (
				<AlertMessage
					message={alertMessage}
					theme={alertTheme}
					showToast={true}
					setShowToast={setAlert}
					setMessage={setAlertMessage}
					setTheme={setAlertTheme}
				/>
			)}
			<Row>
				<Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => sendEmail(e)}>
					<h3 className="text-center">
						Tällä lomakkeella voit ottaa meihin yhteyttä sähköpostitse.
					</h3>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Sähköposti</Form.Label>
						<Form.Control
							type="email"
							placeholder="Sähköposti"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Otsikko</Form.Label>
						<Form.Control
							placeholder="Viestisi aihe"
							onChange={(e) => setSubject(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Viesti</Form.Label>
						<Form.Control
							as="textarea"
							rows="10"
							onChange={(e) => setBody(e.target.value)}
						/>
					</Form.Group>

					<Button
						variant="primary"
						type="submit"
						disabled={
							email && subject && body && email.includes("@") ? false : true
						}
					>
						Lähetä sähköposti
					</Button>
				</Form>
			</Row>
		</div>
	);
};

export default Contact;
