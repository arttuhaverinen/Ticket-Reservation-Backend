import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AlertMessage from "./AlertMessage";

const Register = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [userName, setUserName] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const [alert, setAlert] = useState(false);
	const [alertTheme, setAlertTheme] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

	/* 			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				else return res.json();
			})
			.then((res) => {*/
	const register = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log("register");
		fetch(`${baseurl}/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: userName, password: password }),
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				else return res;
			})
			.then((res) => {
				console.log(res);
				setAlert(true);
				setAlertMessage(
					"Käyttäjän rekisteröinti onnistui. Viimeistele rekisteröinti sähköpostiisi lähetetyn vahvistuslinkin kautta."
				);
				setAlertTheme("success");
			})
			.catch((error) => {
				console.log(error);
				setAlert(true);
				setAlertMessage("Käyttäjän rekisteröinti epäonnistui.");
				setAlertTheme("danger");
			});
	};

	return (
		<div className="w-75 mx-auto my-5 gray-div shadow p-3 mb-5 rounded">
			<h3>Rekisteröidy</h3>

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
			<Form onSubmit={(e) => register(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Käyttäjänimi</Form.Label>
					<Form.Control
						onChange={(e) => setUserName(e.target.value)}
						type="email"
						placeholder=""
						data-testid="register-username-label"
					/>
					<Form.Text className="text-muted"></Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Salasana</Form.Label>
					<Form.Control
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder=""
						data-testid="register-password-label"
					/>
				</Form.Group>
				<h6 className="my-1">Salasanassa täytyy olla:</h6>
				<p className="my-0">{"1. Ainakin yksi numero (0-9)"}</p>
				<p className="my-0">{"2. Ainakin yksi iso kirjain (A-Z)"}</p>
				<p className="my-0">
					{"3. Ainakin yksi ei-aakkosnumeerinen merkki (@ # % ?)"}
				</p>

				<Button
					className="my-3"
					data-testid="register-submit-button"
					variant="primary"
					type="submit"
				>
					Rekisteröidy
				</Button>
			</Form>
		</div>
	);
};

export default Register;
