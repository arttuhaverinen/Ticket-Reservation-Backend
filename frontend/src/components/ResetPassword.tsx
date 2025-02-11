import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import { Appcontext } from "../App";

const ResetPassword = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [searchParams, setSearchParams] = useSearchParams();

	const [userName, setUserName] = useState<string>("null");
	const [password, setPassword] = useState<string>("null");
	const [alert, setAlert] = useState(false);
	const [alertTheme, setAlertTheme] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

	const currentUrl = window.location.href;
	console.log(currentUrl);

	let urlObj = new URL(currentUrl);

	let code = urlObj.searchParams.get("code");

	let decodedCode = decodeURIComponent(code);
	// get the code after last empty space in url
	let resetCode = decodedCode.split(" ").pop();

	const login = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		console.log("reset pw");
		fetch(`${baseurl}/resetPassword`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: userName,
				resetCode: resetCode,
				newPassword: password,
			}),
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				else return res.text();
			})
			.then((res) => {
				console.log(res);
				console.log(res);
				setAlert(true);
				setAlertMessage("Salasanan päivittäminen onnistui.");
				setAlertTheme("success");
			})
			.catch((error) => {
				console.log("catch", error),
					setAlert(true),
					setAlertMessage("Salasanan päivittäminen epäonnistui.");
				setAlertTheme("danger");
			});
	};

	return (
		<div className="w-75 mx-auto my-5 shadow p-3 mb-5 gray-div rounded">
			{console.log(resetCode)}
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
			<h3>Salasanan vaihtaminen</h3>
			<Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => login(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Sähköposti</Form.Label>
					<Form.Control
						onChange={(e) => setUserName(e.target.value)}
						type="email"
						placeholder=""
						data-testid="login-username-label"
					/>
					<Form.Text className="text-muted"></Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Uusi salasana</Form.Label>
					<Form.Control
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder=""
						data-testid="login-password-label"
					/>
				</Form.Group>
				<Button
					data-testid="login-submit-button"
					variant="primary"
					type="submit"
				>
					Päivitä salasana
				</Button>
			</Form>
		</div>
	);
};

export default ResetPassword;
