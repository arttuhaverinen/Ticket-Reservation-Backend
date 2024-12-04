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
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
	setProfilePicture: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Appcontext = createContext<AppContextType | undefined>(undefined);

function App() {
	const [count, setCount] = useState(0);
	const [weather, setWeather] = useState<null | Array<WeatherForecast>>(null);
	const [appToken, setAppToken] = useState<string | null>(null);
	const [appUserName, setAppUserName] = useState<string | null>(null);
	const [appRefreshToken, setAppRefreshToken] = useState<string | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [profilePicture, setProfilePicture] = useState(null);

	let baseurl: string = import.meta.env.VITE_BASEURL;
	console.log(baseurl);
	console.log(appUserName);

	const fetchProfileImage = () => {
		try {
			fetch(`${baseurl}/api/minio`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
				},
			})
				.then((res) => res.json())
				.then((res) => setProfilePicture(res.url));
		} catch (error) {}
	};

	useEffect(() => {
		if (!appToken) {
			if (localStorage.getItem("accesstoken")) {
				console.log("setting token");
				setAppToken(localStorage.getItem("accesstoken"));
			}
			if (localStorage.getItem("refreshtoken")) {
				setAppRefreshToken(localStorage.getItem("refreshtoken"));
			}
			if (localStorage.getItem("username")) {
				setAppUserName(localStorage.getItem("username"));
			}
		}
	}, []);

	useEffect(() => {
		console.log(appToken, "check if admin");

		if (appUserName && appToken) {
			fetch(`${baseurl}/api/role`, {
				headers: { Authorization: `Bearer ${appToken}` },
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					if (res == "Admin") {
						console.log("is admin");
						setIsAdmin(true);
					}
				});
			fetchProfileImage();
		}
	}, [appToken]);

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
			}}
		>
			<Router basename={basename}>
				<Navigation />
				<Container fluid className="app  ">
					{console.log(profilePicture)}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/tickets" element={<Tickets />} />
						<Route path="/orders" element={<Orders />} />
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
					<CompanyDetails />
				</Container>
				<Footer />
			</Router>
		</Appcontext.Provider>
	);
}

export default App;
