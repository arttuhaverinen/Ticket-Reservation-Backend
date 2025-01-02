import React, { useContext } from "react";
import AdminCreatePost from "./AdminCreatePost";
import { Row, Col, Container } from "react-bootstrap";
import Posts from "./Posts";
import OwnTickets from "./OwnTickets";
import CreateTimetable from "./TimetableView";
import TimetableView from "./TimetableView";
import { Appcontext } from "../App";
import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";

const ProfileNavigation = () => {
	return (
		<Container className=" p-0 mx-auto my-3 shadow p-3 bg-white rounded">
			<Row className=" ">
				<Col>
					<Link to={"/profile/"}>
						<h5>Profiili</h5>
					</Link>
				</Col>
				<Col>
					<Link to={"/profile/timetables"}>
						<h5>Ajovuorot</h5>
					</Link>{" "}
				</Col>
				<Col>
					<Link to={"/profile/posts"}>
						<h5>Ilmoitukset</h5>
					</Link>{" "}
				</Col>
				<Col>
					<Link to={"/profile/tickets"}>
						<h5>Liput</h5>
					</Link>{" "}
				</Col>
			</Row>
		</Container>
	);
};

export default ProfileNavigation;
