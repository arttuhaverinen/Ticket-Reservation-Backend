import React, { useContext } from "react";
import AdminCreatePost from "./AdminCreatePost";
import { Row, Col } from "react-bootstrap";
import Posts from "./Posts";
import OwnTickets from "./OwnTickets";
import CreateTimetable from "./TimetableView";
import TimetableView from "./TimetableView";
import { Appcontext } from "../App";
import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";

const ProfileNavigation = () => {
	return (
		<div className=" mx-auto">
			<Row className=" mx-auto border">
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
		</div>
	);
};

export default ProfileNavigation;
