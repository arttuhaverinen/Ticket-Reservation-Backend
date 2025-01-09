import React, { useState, useContext, useEffect } from "react";
import {
	Col,
	Container,
	Form,
	Row,
	Image,
	Toast,
	Spinner,
} from "react-bootstrap";
import { Search } from "./Search";
import Posts from "./Posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fi } from "date-fns/locale/fi";
import Offers from "./Offers";
import Footer from "./Footer";
import mountains from "../images/outputcrop.jpg";
import forest from "../images/uusi.jpeg";

import "../App.css";
import ToastMessage from "./AlertMessage";
import AlertMessage from "./AlertMessage";
import useTokenExpireMiddleware from "../middleware/useTokenExpireMiddleware";
import Success from "./Success";
import ImageOverlay from "./ImageOverlay";
import { useMediaQuery } from "react-responsive";
import ProfilePicture from "./ProfilePicture";
import Minio from "./Minio";

registerLocale("fi", fi);

const Home = () => {
	useTokenExpireMiddleware();
	const mobileScreen = useMediaQuery({ query: "(max-width: 991px)" });
	const [imageUrl, setImageUrl] = useState("");
	const minioUrl = "http://localhost:9000/test/image.png";
	//setImageUrl(minioUrl);
	const [startDate, setStartDate] = useState(new Date());
	const [showToast, setShowToast] = useState(true);

	return (
		<Container fluid style={{ padding: 0 }} className="home">
			{mobileScreen ? (
				<Row
					style={{
						backgroundImage: `url(${forest})`,
						/*backgroundSize: "cover", // Ensures the image covers the entire area*/
						backgroundSize: "100% auto", // Ensures the image scales fluidly across the width
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						minHeight: "200px", // Defines a minimum height for the row
					}}
				>
					{/* Overlay Text 
				<div
					className="overlay-text"
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						color: "white",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						padding: "10px 20px",
						borderRadius: "5px",
					}}
				>
					<h3>This is an overlay text</h3>
				</div> */}
				</Row>
			) : (
				<Container
					fluid
					style={{
						backgroundImage: `url(${forest})`,
						backgroundSize: "cover", // Ensures the image covers the entire area
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						minHeight: "500px", // Defines a minimum height for the row
						position: "relative",
					}}
				>
					<Container>
						<Row className="image-container">
							<Col md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
								<h1></h1>{" "}
							</Col>
							<Col md={6} lg={6} xl={6} style={{ zIndex: 1 }}>
								<Search />
							</Col>
						</Row>
						{/* Overlay Text 
					{/*

				*/}
					</Container>
				</Container>
			)}
			<Container fluid style={{ padding: 0 }}>
				{mobileScreen && <Search />}
				<Row className=" w-100 mx-auto">
					<Posts />
					<Offers />
				</Row>
				{/*
			<Row className="justify-content-between">
				<Col xs={4}>
					<div className="border border-black">1</div>
				</Col>
				<Col xs={4}>
					<div className="border border-black">2</div>
				</Col>
				<Col xs={4}>
					<div className="border border-black">3</div>
				</Col>
			</Row>
	*/}
			</Container>
		</Container>
	);
};

export default Home;
