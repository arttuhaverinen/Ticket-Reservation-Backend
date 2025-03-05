import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import GoogleLogo from "../images/googlelogo.png";
import { Appcontext } from "../App";
import AlertMessage from "./AlertMessage";
import { Link } from "react-router-dom";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { Col, Row } from "react-bootstrap";
const Login = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [userName, setUserName] = useState<string>("null");
	const [password, setPassword] = useState<string>("null");
	const { setAppUserName, setAppToken, setAppRefreshToken } =
		useContext(Appcontext)!;
	const [alert, setAlert] = useState(false);
	const [alertTheme, setAlertTheme] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

	const login = (e: React.FormEvent<HTMLFormElement>): void => {
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
			<h3>Kirjaudu</h3>
			<Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => login(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Käyttäjänimi</Form.Label>
					<Form.Control
						onChange={(e) => setUserName(e.target.value)}
						type="email"
						placeholder=""
						data-testid="login-username-label"
					/>
					<Form.Text className="text-muted"></Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Salasana</Form.Label>
					<Form.Control
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder=""
						data-testid="login-password-label"
					/>
				</Form.Group>

				<Row>
					<Col xs={12} md={4}>
						{" "}
						<Button
							className="mb-3 w-100 "
							data-testid="login-submit-button"
							variant="primary"
							type="submit"
						>
							Kirjaudu
						</Button>
					</Col>
					<div className="w-100"></div>
					<Col xs={12} md={4} className="mb-3">
						{" "}
						<Button
							className="p-1 w-100"
							href="http://localhost:5001/login/google"
						>
							<Image
								style={{ height: "32px" }}
								className="bg-white me-2 p-0"
								src={GoogleLogo}
							/>
							Kirjaudu Googlella
						</Button>
					</Col>
					<div className="w-100"></div>
					<Col xs={12} md={4}>
						<Link className="" to={"/forgotpassword"}>
							Unohdin salasanani.
						</Link>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default Login;
