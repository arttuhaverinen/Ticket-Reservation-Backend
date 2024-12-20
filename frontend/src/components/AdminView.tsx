import React, { useContext } from "react";
import AdminCreatePost from "./AdminCreatePost";
import { Row, Col, Container } from "react-bootstrap";
import Posts from "./Posts";
import OwnTickets from "./OwnTickets";
import CreateTimetable from "./TimetableView";
import TimetableView from "./TimetableView";
import { Appcontext } from "../App";
import ProfilePicture from "./ProfilePicture";
import ProfileNavigation from "./ProfileNavigation";
import { Outlet } from "react-router-dom";

const AdminView = () => {
	const {
		appUserName,
		setAppUserName,
		appToken,
		setAppToken,
		isAdmin,
		setIsAdmin,
	} = useContext(Appcontext)!;

	return (
		<Container className="w-75 my-5 mx-auto">
			{isAdmin && (
				<Row>
					<Col md={12} lg={12}>
						<ProfileNavigation />
					</Col>
					{/*
					<Col md={12} lg={6}>
						<AdminCreatePost />
					</Col>
					<Col md={12} lg={6}>
						<Posts />
					</Col>
					<Row>
						<TimetableView />
					</Row>
					<Row>
						<ProfilePicture />
			</Row> */}
					<Outlet />
				</Row>
			)}
		</Container>
	);
};

export default AdminView;
