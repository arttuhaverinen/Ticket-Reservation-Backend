import React, { useState, useContext, useEffect } from "react";
import { Col, Container, Form, Row, Image, Toast } from "react-bootstrap";
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
import "../App.css";
import ToastMessage from "./AlertMessage";
import AlertMessage from "./AlertMessage";
import useTokenExpireMiddleware from "../middleware/useTokenExpireMiddleware";
import Success from "./Success";

registerLocale("fi", fi);

const Home = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [showToast, setShowToast] = useState(true);
	return (
		<Container className="">
			{useTokenExpireMiddleware()}

			<Container className="w-100 image-wrapper">
				<Image className="image-constrain-height" src={mountains} />
			</Container>
			<p>workflow test</p>
			<Search />
			<Row className="w-100 my-5 mx-auto">
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
	);
};

export default Home;
