import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
	return (
		<footer className="bg-dark text-white py-4 ">
			<Container className="">
				<h5 className="text-center my-3">Sovelluksen tekninen toteutus</h5>

				<Row className="justify-content-center">
					{/* Column 1: About Us */}
					<Col className="text-center my-3" lg={2} xs={6}>
						<h6 className="my-2">Frontend</h6>
						<p className="m-0">{"React (vite)"}</p>
						<p className="m-0">Bootstrap 5</p>
						<p className="m-0">TypeScript</p>
					</Col>
					<Col className="text-center my-3" lg={2} xs={6}>
						<h6 className="my-2">Backend</h6>
						<p className="m-0">.Net 8 (C#)</p>
						<p className="m-0">Entity Framework Core</p>
						<p className="m-0">Identity Framework</p>
						<p className="m-0">Stripe - Maksujen käsittely</p>
						<p className="m-0">PostgreSQL</p>
						<p className="m-0">Minio</p>
						<p className="m-0">Swagger</p>
						<p className="m-0">Mailkit</p>
					</Col>
					<Col className="text-center my-3" lg={2} xs={6}>
						<h6 className="my-2">Testaus</h6>
						<p className="m-0">Vitest</p>
						<p className="m-0">React testing library</p>
						<p className="m-0">Cypress</p>
						<p className="m-0">XUnit</p>
					</Col>
					<Col className="text-center my-3" lg={2} xs={6}>
						<h6 className="my-2">Devops & CI/CD</h6>
						<p className="m-0">Docker (dev, test, prod)</p>
						<p className="m-0">Github actions</p>
						<p className="m-0">Ubuntu VPS</p>
						<p className="m-0">NginX</p>
					</Col>
					<Col className="text-center my-3" lg={2} xs={6}>
						<h6 className="my-2">Logit</h6>
						<p className="m-0">Serilog</p>
						<p className="m-0">Elasticsearch </p>
						<p className="m-0">Kibana </p>
					</Col>
					{/* Column 2: Quick Links */}

					{/* Column 3: Contact Info */}
				</Row>

				<hr className="my-3" />

				<Row>
					<Col md={6} xs={12} className="text-center my-3">
						<div>
							<h5 className="">Yhteystiedot</h5>
							Haverinen994@gmail.com
							<br />
							<a
								className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
								href="https://github.com/arttuhaverinen"
							>
								Github
							</a>{" "}
						</div>
					</Col>
					<Col className="text-center my-3" md={6} xs={12}>
						<div>
							<h5 className="">Muut projektini</h5>
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
						</div>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
