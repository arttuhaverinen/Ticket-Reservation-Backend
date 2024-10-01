import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
	return (
		<footer className="bg-dark text-white py-4 mt-5 ">
			<Container className="w-100 ">
				<Row>
					{/* Column 1: About Us */}
					<Col md={6} sm={12}>
						<h5 className=" my-3">Käytetyt teknologiat</h5>
						<Row>
							<Col md={3}>
								<h6 className="my-2">Frontend</h6>
								<p className="m-0">{"React (vite)"}</p>
								<p className="m-0">Bootstrap 5</p>
							</Col>
							<Col md={9}>
								<h6 className="my-2">Backend</h6>
								<p className="m-0">{".Net 8 (C#)"}</p>
								<p className="m-0">
									{"Entity Framework Core & Identity Framework"}
								</p>
								<p className="m-0">{"Stripe - Maksujen käsittely"}</p>
								<p className="m-0">{"PostgreSQL"}</p>
								<p className="m-0">{"Ubuntu VPS & NginX"}</p>
							</Col>
						</Row>
					</Col>

					{/* Column 2: Quick Links */}

					{/* Column 3: Contact Info */}
					<Col md={4} sm={12}>
						<h5 className="my-3">Yhteystiedot</h5>
						<address>
							Haverinen994@gmail.com
							<br />
							<a
								className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
								href="https://github.com/arttuhaverinen"
							>
								github
							</a>{" "}
							<br />
							<h5 className="my-3">Muut projektini</h5>
							<a
								className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
								href="https://yahtzee-app.onrender.com/"
							>
								Yahtzee-noppapeli
							</a>{" "}
							<br />
							<a
								className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
								href="https://audio-classification-app-g3ek.onrender.com/"
							>
								Ihmisen puhetta luokitteleva sovellus
							</a>{" "}
							<br />
						</address>
					</Col>
				</Row>

				<Row className="pt-3">
					<Col className="text-center">
						<p className="mb-0"></p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
