import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Info = () => {
	return (
		<Container className="p-3 mb-5 mx-auto  rounded   ">
			<Container className=" ">
				<h2 className="text-center my-3">Meille tärkeitä arvoja</h2>
				<Row className="g-5 my-3">
					<Col
						md={4}
						xs={12}
						className="d-flex flex-column justify-content-center p-3 "
					>
						<i
							className="fa fa-bus text-center "
							style={{
								height: "100px",
								fontSize: "80px",
								lineHeight: "50px",
								margin: 0,
								padding: 0,
								color: "#4863A0",
							}}
							aria-hidden="true"
						></i>
						<h3 className="">Laadukas palvelu</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Asperiores sapiente delectus minus hic, quis et nobis neque cum,
							consectetur ipsa quae nam est sed consequatur cumque beatae vel
							molestiae id!
						</p>
					</Col>
					<Col
						md={4}
						xs={12}
						className="d-flex flex-column justify-content-center  p-3 "
					>
						<i
							className="fa fa-shield text-center "
							aria-hidden="true"
							style={{
								height: "100px",
								fontSize: "80px",
								lineHeight: "50px",
								margin: 0,
								padding: 0,
								color: "silver",
							}}
						></i>
						<h3 className="">Turvallisuus</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
							voluptatibus nesciunt at quaerat beatae nam doloremque, eaque vel,
							ut quo blanditiis harum consequatur ipsam totam magni quam facere
							voluptates sapiente?
						</p>
					</Col>
					<Col
						md={4}
						xs={12}
						className="d-flex flex-column justify-content-center  p-3 "
					>
						<i
							className="fa  fa-leaf text-center "
							style={{
								height: "100px",
								fontSize: "80px",
								lineHeight: "50px",
								margin: 0,
								padding: 0,
								color: "#17B169",
							}}
							aria-hidden="true"
						></i>
						<h3 className="">Ympäristö</h3>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
							vitae iusto ex ea dolore soluta corporis repudiandae voluptate,
							facilis architecto molestiae officia incidunt ipsa tempora nulla
							blanditiis aperiam? Nobis, omnis?
						</p>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default Info;
