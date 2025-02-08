import { Row, Col, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Appcontext } from "../App";
import { useContext } from "react";
const ProfileNavigation = () => {
	const location = useLocation();
	const { isAdmin } = useContext(Appcontext);
	return (
		<Container className="p-0 mx-auto my-3 shadow p-3 gray-div rounded">
			<Row className="d-flex justify-content-center">
				<Col xs={6} lg={3} className="d-flex justify-content-center">
					<Link className="" to={"/profile/"}>
						<h5
							className={
								location.pathname == "/profile/" ||
								location.pathname == "/profile"
									? "border-3 border-bottom border-primary d-inline-block"
									: ""
							}
						>
							Profiili
						</h5>
					</Link>
				</Col>
				<Col
					xs={6}
					lg={3}
					className={`${
						isAdmin ? "" : "d-none"
					} d-flex  justify-content-center`}
				>
					<Link to={"/profile/timetables"}>
						<h5
							className={
								location.pathname.includes("timetables")
									? "border-3 border-bottom border-primary d-inline-block"
									: ""
							}
						>
							Ajovuorot
						</h5>
					</Link>{" "}
				</Col>
				<Col
					xs={6}
					lg={3}
					className={` ${
						isAdmin ? "" : "d-none"
					} d-flex justify-content-center`}
				>
					<Link to={"/profile/posts"}>
						<h5
							className={
								location.pathname.includes("posts")
									? "border-3 border-bottom border-primary d-inline-block"
									: ""
							}
						>
							Ilmoitukset
						</h5>
					</Link>{" "}
				</Col>
				<Col xs={6} lg={3} className="d-flex justify-content-center">
					<Link to={"/profile/tickets"}>
						<h5
							className={
								location.pathname.includes("tickets")
									? "border-3 border-bottom border-primary d-inline-block"
									: ""
							}
						>
							Liput
						</h5>
					</Link>{" "}
				</Col>
			</Row>
		</Container>
	);
};

export default ProfileNavigation;
