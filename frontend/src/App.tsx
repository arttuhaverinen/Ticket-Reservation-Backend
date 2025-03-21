import { useEffect, useState, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Register from "./components/Register";
import Login from "./components/Login";
import { Col, Container, Navbar, Row, Image } from "react-bootstrap";
import Navigation from "./components/Navigation";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useSearchParams,
} from "react-router-dom";
import Home from "./components/Home";
import Tickets from "./components/Tickets";
import Orders from "./components/Orders";
import AdminView from "./components/AdminView";
import StripeContainer from "./components/StripeContainer";
import Failed from "./components/Failed";
import useTokenExpireMiddleware from "./middleware/useTokenExpireMiddleware";
import CreateTimetable from "./components/CreateTimetable";
import ModifyTimetable from "./components/ModifyTimetable";
import Footer from "./components/Footer";
import.meta.env.MODE;
import mountains from "./images/outputcrop.jpg";
import Success from "./components/Success";
import CompanyDetails from "./components/CompanyDetails";
import TimetableView from "./components/TimetableView";
import ProfileNavigation from "./components/ProfileNavigation";
import OwnTickets from "./components/OwnTickets";
import Posts from "./components/Posts";
import AdminCreatePost from "./components/AdminCreatePost";
import ProfilePicture from "./components/ProfilePicture";
import ConfirmEmail from "./components/ConfirmEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const basename = window.location.pathname.startsWith("/client")
	? "/client"
	: "";

interface WeatherForecast {
	date: Date;
	summary: string;
	temperatureC: number;
	temperatureF: number;
}

interface AppContextType {
	appUserName: string | null;
	appToken: string | null;
	appRefreshToken: string | null;
	setAppToken: React.Dispatch<React.SetStateAction<string | null>>;
	setAppRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
	setAppUserName: React.Dispatch<React.SetStateAction<string | null>>;
	isAdmin: boolean;
	setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
	profilePicture: string | null;
	setProfilePicture: React.Dispatch<React.SetStateAction<string | null>>;
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Appcontext = createContext<AppContextType | undefined>(undefined);

function App() {
	const [count, setCount] = useState(0);
	const [weather, setWeather] = useState<null | Array<WeatherForecast>>(null);
	const [appToken, setAppToken] = useState<string | null>(null);
	const [appUserName, setAppUserName] = useState<string | null>(null);
	const [appRefreshToken, setAppRefreshToken] = useState<string | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const [darkMode, setDarkMode] = useState(false);
	const [googleCookies, setGoogleCookie] = useState(false);

	let baseurl: string = import.meta.env.VITE_BASEURL;
	console.log(baseurl);
	console.log(appUserName);

	// Login with refreshtoken in url
	useEffect(() => {
		const queryString = window.location.search; // e.g., "?key=value&anotherKey=anotherValue"
		const urlParams = new URLSearchParams(queryString);
		const refreshToken = urlParams.get("token"); // Replace 'key' with the actual parameter name
		console.log(refreshToken); // Outputs the value of 'key', e.g., "value"

		if (refreshToken) {
			// Fetch new accessToken
			fetch(`${baseurl}/refresh`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refreshToken: refreshToken }),
			})
				.then((res) => res.json())
				.then((res) => {
					console.log("auth res", res);
					localStorage.setItem("accesstoken", res.accessToken);
					localStorage.setItem("refreshtoken", res.refreshToken);
					localStorage.setItem("accessexpire", res.expiresIn);
					localStorage.setItem("time", Date.now().toString());
					setAppToken(res.accessToken);
					setAppRefreshToken(res.refreshToken);
					return fetch(`${baseurl}/api/role`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
						},
					});
				})
				.then((res) => res.json())
				.then((res) => {
					console.log("role check");
					if (res.role == "Admin") {
						console.log("is admin");
						setIsAdmin(true);
					}
					localStorage.setItem("username", res.username);
					setAppUserName(res.username);
					fetchProfileImage();
				})
				.catch((error) => console.log(error));
		}

		// Fetch user role and username
	}, []);

	useEffect(() => {
		if (!appToken) {
			let accesstoken = localStorage.getItem("accesstoken");
			let refreshtoken = localStorage.getItem("refreshtoken");
			let username = localStorage.getItem("username");

			if (accesstoken) {
				setAppToken(localStorage.getItem("accesstoken"));
			}
			if (refreshtoken) {
				setAppRefreshToken(localStorage.getItem("refreshtoken"));
			}
			if (username) {
				setAppUserName(localStorage.getItem("username"));
			}
		}
	}, []);

	const fetchProfileImage = () => {
		console.log("vite mode ", import.meta.env.MODE);
		console.log("profile pic", localStorage.getItem("accesstoken"));
		if (
			localStorage.getItem("accesstoken") &&
			import.meta.env.MODE == "development"
		) {
			try {
				fetch(`${baseurl}/api/User`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accesstoken")} `,
					},
				})
					.then((res) => res.json())
					.then((res) => {
						console.log("IMAGE: ", res);
						return fetch(`${baseurl}/api/minio/${res.profileImage}`);
						//fetchProfileImage();
					})
					.then((res) => res.json())
					.then((res) => {
						setProfilePicture(res.url);
						console.log(res.url);
					});
			} catch (error) {}
		}
		if (
			localStorage.getItem("accesstoken") &&
			import.meta.env.MODE == "production"
		) {
			try {
				fetch(`${baseurl}/api/User`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accesstoken")} `,
					},
				})
					.then((res) => res.json())
					.then((res) => {
						console.log("IMAGE: ", res);
						return fetch(`${baseurl}/api/minio/${res.profileImage}`);
						//fetchProfileImage();
					})
					.then((res) => res.json())
					.then((res) => {
						setProfilePicture(res.url);
						console.log(res.url);
					});
			} catch (error) {}
		}
	};

	useEffect(() => {
		console.log(
			appToken,
			localStorage.getItem("accesstoken"),
			"check profileimage"
		);

		if (appUserName && appToken) {
			fetch(`${baseurl}/api/User`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accesstoken")} `,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					console.log("IMAGE: ", res);
					return fetch(`${baseurl}/api/minio/${res.profileImage}`);
					//fetchProfileImage();
				})
				.then((res) => res.json())
				.then((res) => {
					console.log("res url", res.url);
					setProfilePicture(res.url);
				});
		}
	}, [appToken]);

	useEffect(() => {
		console.log(appToken, "check if admin");
		console.log("admin", appToken, appUserName);
		//let accessToken = localStorage.getItem("accesstoken");
		//let username = localStorage.getItem("username");
		if (appToken && appUserName) {
			console.log("checking role");
			fetch(`${baseurl}/api/role`, {
				headers: { Authorization: `Bearer ${appToken}` },
			})
				.then((res) => res.json())
				.then((res) => {
					console.log("role", res);
					if (res.role == "Admin") {
						console.log("is admin");
						setIsAdmin(true);
					}
				});
			fetchProfileImage();
		}
	}, [appToken]);

	useEffect(() => {
		console.log("toggle dark mde");
		document.body.classList.toggle("dark-mode", darkMode);
	});

	// Check if logged in with google
	useEffect(() => {
		if (!appToken) {
			console.log("apptoken login process");
			fetch(`${baseurl}/login-process`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					console.log("login process", res.status);
					if (res.status == 401) {
						console.log("login process 401");
						throw new Error();
					}
					return res.json();
				})
				.then((res) => {
					console.log("apptoken login process setters", res);
					localStorage.setItem("accesstoken", res.accessToken);
					localStorage.setItem("refreshtoken", res.refreshToken);
					localStorage.setItem("accessexpire", res.expiresIn);
					localStorage.setItem("time", Date.now().toString());
					setAppToken(res.accessToken);
					setAppRefreshToken(res.refreshToken);

					fetchProfileImage();

					return fetch(`${baseurl}/api/role`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
						},
					});
				})
				.then((res) => res.json())
				.then((res) => {
					console.log("role check");
					if (res.role == "Admin") {
						console.log("is admin");
						setIsAdmin(true);
					}
					localStorage.setItem("username", res.username);
					setAppUserName(res.username);
				})
				.catch((error) => console.log(error));
		}
	});

	return (
		<Appcontext.Provider
			value={{
				appUserName,
				setAppUserName,
				appToken,
				setAppRefreshToken,
				appRefreshToken,
				setAppToken,
				isAdmin,
				setIsAdmin,
				profilePicture,
				setProfilePicture,
				darkMode,
				setDarkMode,
			}}
		>
			<Router basename={basename}>
				<Navigation />
				{console.log("apptoken", appToken)}
				<Container fluid style={{ padding: 0 }} className="app">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forgotpassword" element={<ForgotPassword />} />
						<Route path="/tickets" element={<Tickets />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/confirmEmail" element={<ConfirmEmail />} />
						<Route path="/resetPassword" element={<ResetPassword />} />
						<Route path="/profile" element={<AdminView />}>
							<Route index element={<ProfilePicture />} />
							<Route path="description" element={<ProfilePicture />} />
							<Route path="timetables" element={<TimetableView />} />
							<Route path="posts" element={<AdminCreatePost />} />
							<Route path="tickets" element={<OwnTickets />} />

							<Route
								path="timetables/createtimetable"
								element={<CreateTimetable />}
							/>
							<Route
								path="timetables/modifytimetable"
								element={<ModifyTimetable />}
							/>
						</Route>{" "}
						<Route path="/failed" element={<Failed />} />
						<Route path="/success" element={<Success />} />
					</Routes>

					{/* 
					<Row className="card m-0">
						<Col xs={12}>
							{/*weather &&
								weather.map((elem) => {
									return (
										<ul>
											<li> {elem.date}</li>
											<li> {elem.temperatureC}</li>
											<li> {elem.summary}</li>
										</ul>
									);
								}) }
						</Col>
					</Row>
				*/}
				</Container>
				<Footer />
			</Router>
		</Appcontext.Provider>
	);
}

export default App;
