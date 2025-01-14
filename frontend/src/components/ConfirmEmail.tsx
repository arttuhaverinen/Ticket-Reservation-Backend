import { useEffect, useState } from "react";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

const ConfirmEmail = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [error, setError] = useState(false);
	const [succeeded, setSucceeded] = useState(false);

	let baseurl: string = import.meta.env.VITE_BASEURL;

	useEffect(() => {
		let userId = searchParams.get("userId");
		let code = searchParams.get("code");

		if (userId && code) {
			fetch(`${baseurl}/confirmEmail?userId=${userId}&code=${code}`)
				.then((res) => {
					if (res.ok) {
						setTimeout(() => {
							setSucceeded(true);
						}, 2000);
					} else {
						setTimeout(() => {
							setError(true);
						}, 2000);
					}
				})
				.catch((error) => console.log(error));
		}
	}, []);

	return (
		<Container className="justify-content-center my-5">
			{!error ? (
				<>
					{!succeeded ? (
						<>
							<h3>Rekisteröintiä viimeistellään. Odota hetki.</h3>
							<Row className="my-3">
								<Spinner
									className="mx-auto"
									style={{ width: "4rem", height: "4rem" }}
									animation="border"
									role="status"
								></Spinner>
							</Row>
						</>
					) : (
						<Container className="w-50 mx-auto">
							<h3>
								Rekisteröinnin viimeistely onnistui. Voit nyt kirjautua
								käyttäjälläsi.
							</h3>
							<Link className="" to="/login">
								<Button className="w-100 btn btn-primary mx-auto">
									Kirjaudu sisään
								</Button>
							</Link>
						</Container>
					)}
				</>
			) : (
				<Container className="w-50 mx-auto">
					<h3>Rekisteröinnin viimeistelyssä tapahtui virhe.</h3>
					<Link className="" to="/">
						<Button className="w-100 btn btn-primary mx-auto">
							Palaa takaisin etusivulle
						</Button>
					</Link>
				</Container>
			)}
		</Container>
	);
};

export default ConfirmEmail;
