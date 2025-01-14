import { useContext } from "react";
import { Row, Container } from "react-bootstrap";

import { Appcontext } from "../App";
import ProfileNavigation from "./ProfileNavigation";
import { Outlet } from "react-router-dom";

const AdminView = () => {
	const { isAdmin } = useContext(Appcontext)!;

	return (
		<Container className=" my-3 mx-auto">
			{isAdmin && (
				<Row>
					<ProfileNavigation />
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
