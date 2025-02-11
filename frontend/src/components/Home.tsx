import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Search } from "./Search";
import Posts from "./Posts";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { fi } from "date-fns/locale/fi";
import Offers from "./Offers";
import forest from "../images/uusi.jpeg";

import "../App.css";
import useTokenExpireMiddleware from "../middleware/useTokenExpireMiddleware";
import { useMediaQuery } from "react-responsive";
import Info from "./Info";

registerLocale("fi", fi);

const Home = () => {
	useTokenExpireMiddleware();
	const mobileScreen = useMediaQuery({ query: "(max-width: 991px)" });
	//setImageUrl(minioUrl);

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
					<Info />
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
			<a href="localhost:5173/resetPassword?code=Please reset your password using the following code: Q2ZESjhIWTNHeTROS2toSXEyWC9kNWROZXlZa1R5UGhjUlEwV080ZUFTNDlmV0lCUGNJWFJPZE0yUHV0cnRqakhmWGlpS2xmTFdXZmRoMS9vT09qY1poWHArVVRqdjI3c25FR2FvS0k2SDhKMWVhZStGN3ErSUloZmF1eEdVRElIekZlTHlIclR2cjMycTlHV3djSWM5WktVc3NHYStBQ2FDT3hMVmYramF1akFnb0JVSEpSLzNIcHJReHJ0eXJwVEVYTTRnPT0">
				Reset Password
			</a>
		</Container>
	);
};

export default Home;
