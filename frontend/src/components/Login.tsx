import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Appcontext } from "../App";
import AlertMessage from "./AlertMessage";
const Login = (props) => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [userName, setUserName] = useState<string>("null");
	const [password, setPassword] = useState<string>("null");
	const {
		appUserName,
		setAppUserName,
		appToken,
		setAppToken,
		appRefreshToken,
		setAppRefreshToken,
	} = useContext(Appcontext);
	const [alert, setAlert] = useState(false);
	const [alertTheme, setAlertTheme] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

	const login = (e) => {
		e.preventDefault();
		console.log("login");
		fetch(`${baseurl}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: userName, password: password }),
		})
			.then((res) => {
				if (!res.ok) throw Error(res.statusText);
				else return res.json();
			})
			.then((res) => {
				console.log(res);
				setAppToken(res.accessToken);
				setAppRefreshToken(res.refreshToken);
				setAppUserName(userName);
				console.log(res);
				localStorage.setItem("accesstoken", res.accessToken);
				localStorage.setItem("refreshtoken", res.refreshToken);
				localStorage.setItem("username", userName);
				localStorage.setItem("accessexpire", res.expiresIn);
				localStorage.setItem("time", Date.now().toString());
				setAlert(true);
				setAlertMessage("Kirjautuminen onnistui.");
				setAlertTheme("success");
			})
			.catch((error) => {
				console.log("catch", error),
					setAlert(true),
					setAlertMessage("Kirjautuminen epäonnistui.");
				setAlertTheme("danger");
			});
	};

	return (
		<div className="w-75 mx-auto my-5 shadow p-3 mb-5 bg-white rounded">
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
			<h3>Kirjaudu</h3>
			<Form onSubmit={(e) => login(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Käyttäjänimi</Form.Label>
					<Form.Control
						onChange={(e) => setUserName(e.target.value)}
						type="email"
						placeholder=""
					/>
					<Form.Text className="text-muted"></Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Salasana</Form.Label>
					<Form.Control
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder=""
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Kirjaudu
				</Button>
			</Form>
		</div>
	);
};

export default Login;