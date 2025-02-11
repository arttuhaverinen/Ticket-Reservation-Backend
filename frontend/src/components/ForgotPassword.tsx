import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertMessage from "./AlertMessage";

const ForgotPassword = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;

	const [email, setEmail] = useState("");
	const [alert, setAlert] = useState(false);
	const [alertTheme, setAlertTheme] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

	const login = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		console.log("login");
		fetch(`${baseurl}/forgotPassword`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: email }),
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				else return res.text();
			})
			.then((res) => {
				console.log(res);
				console.log(res);
				setAlert(true);
				setAlertMessage(
					"Salasanan palauttamiseen tarvittava linkki lähetettiin antamaasi sähköpostiin."
				);
				setAlertTheme("success");
			})
			.catch((error) => {
				console.log("catch", error),
					setAlert(true),
					setAlertMessage("Tapahtui virhe.");
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
			<h3>Salasanan palauttaminen</h3>
			<Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => login(e)}>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Sähköposti</Form.Label>
					<Form.Control
						onChange={(e) => setEmail(e.target.value)}
						type=""
						placeholder=""
						data-testid="login-password-label"
					/>
				</Form.Group>
				<Button
					data-testid="login-submit-button"
					variant="primary"
					type="submit"
				>
					Palauta salasana
				</Button>
			</Form>
			<br />
		</div>
	);
};

export default ForgotPassword;
