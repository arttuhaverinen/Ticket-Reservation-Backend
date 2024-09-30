import { React, useContext } from "react";
import AdminCreatePost from "./AdminCreatePost";
import { Row, Col } from "react-bootstrap";
import Posts from "./Posts";
import OwnTickets from "./OwnTickets";
import CreateTimetable from "./TimetableView";
import TimetableView from "./TimetableView";
import { Appcontext } from "../App";

const AdminView = () => {
	const {
		appUserName,
		setAppUserName,
		appToken,
		setAppToken,
		isAdmin,
		setIsAdmin,
	} = useContext(Appcontext);

	return (
		<div>
			{isAdmin && (
				<Row>
					<Col md={12} lg={6}>
						<AdminCreatePost />
					</Col>
					<Col md={12} lg={6}>
						<Posts />
					</Col>
					<Row>
						<TimetableView />
					</Row>
				</Row>
			)}
			<Row>
				<OwnTickets />
			</Row>
		</div>
	);
};

export default AdminView;
