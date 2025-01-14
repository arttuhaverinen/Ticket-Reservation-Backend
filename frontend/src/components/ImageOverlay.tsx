import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import forest from "../images/uusi.jpeg";

const ImageOverlay = () => {
	return (
		<Container fluid className="">
			<Row
				style={{
					backgroundImage: `url(${forest})`, // Use imported image here
				}}
				className="image-container"
			>
				<Col md={6}>
					<h1>COLUMN</h1>{" "}
				</Col>
				<Col md={6}>
					<p>123</p>
				</Col>
				Overlay Text
				<div
					className="overlay-text"
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						color: "white",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						padding: "10px 20px",
						borderRadius: "5px",
					}}
				>
					<h3>This is an overlay text</h3>
				</div>
			</Row>
		</Container>
	);
};

export default ImageOverlay;
