import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const CompanyDetails = () => {
	return (
		<Container className="border">
			<Row className="justify-content-center mx-auto">
				<Col className="justify-content-center mx-auto" md={3}>
					<h5 className="w-100 mx-auto">123</h5>
				</Col>
				<Col md={3}>
					{" "}
					<h5>123</h5>
				</Col>
				<Col md={3}>
					{" "}
					<p>123</p>
				</Col>
				<Col md={3}>
					{" "}
					<p>123</p>
				</Col>
			</Row>
		</Container>
	);
};

export default CompanyDetails;
