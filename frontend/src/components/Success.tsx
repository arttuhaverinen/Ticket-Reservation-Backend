import { Container } from "react-bootstrap";

const Success = () => {
	return (
		<Container className="justify-content-center my-5">
			<h1>Kiitos tilauksestasi!</h1>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="160"
				height="160"
				fill="green"
				className="bi bi-check w-100"
				viewBox="0 0 16 16"
			>
				<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
			</svg>{" "}
			<h4 className="w-100 mx-auto text-center">
				Matkalippusi tiedot lähetettiin sähköpostiisi. Jos olet rekisteröitynyt
				käyttäjä, voit tarkastella matkalippusi tietoja myös omasta
				profiilistasi.
			</h4>
		</Container>
	);
};

export default Success;
