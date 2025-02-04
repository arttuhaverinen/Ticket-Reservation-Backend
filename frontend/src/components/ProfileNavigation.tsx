import { Row, Col, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const ProfileNavigation = () => {
	const location = useLocation();
	return (
		<Container className="p-0 mx-auto my-3 shadow p-3 gray-div rounded">
			<Row className=" ">
				<Col>
					<Link to={"/profile/"}>
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
				<Col>
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
				<Col>
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
				<Col>
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
