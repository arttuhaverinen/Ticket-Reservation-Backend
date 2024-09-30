import React, { useContext, useState } from "react";
import { Appcontext } from "../App";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "../App.css";

const Navigation = () => {
	const {
		appUserName,
		setAppUserName,
		appToken,
		setAppToken,
		isAdmin,
		setIsAdmin,
	} = useContext(Appcontext);

	const [expanded, setExpanded] = useState(false);

	const logoutClearLocalStorage = () => {
		localStorage.removeItem("accesstoken");
		localStorage.removeItem("accessexpire");
		localStorage.removeItem("refreshtoken");
		localStorage.removeItem("time");
		localStorage.removeItem("username");
		setAppUserName(null);
		setAppToken(null);
		setIsAdmin(false);
	};

	return (
		<div>
			<Navbar
				expand="lg"
				className="bg-body-tertiary justify-content-between border w-100"
				expanded={expanded}
			>
				<Container>
					{/*<Navbar.Brand>Logo</Navbar.Brand>*/}
					<Navbar.Toggle
						onClick={() => setExpanded(!expanded)}
						aria-controls="basic-navbar-nav"
					/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="w-100 me-auto">
							<Nav.Link>
								<Link to={"/"}>Etusivu</Link>
							</Nav.Link>
							{!appToken ? (
								<>
									<Nav.Link>
										<Link to={"/login"}>Kirjaudu</Link>
									</Nav.Link>
									<Nav.Link className="">
										<Link to={"/register"}>Rekisteröidy</Link>
									</Nav.Link>
								</>
							) : (
								<Nav.Link className="">
									<Link
										className=""
										onClick={() => logoutClearLocalStorage()}
										to={"/"}
									>
										{" "}
										Kirjaudu ulos
									</Link>
								</Nav.Link>
							)}

							{/*
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
	</NavDropdown> */}
							<div className="w-100 d-flex">
								<Nav.Link
									className={`nav-link-account w-100  text-end-responsive}`}
								>
									<Link
										className="w-100 text-end-responsive"
										to={appUserName ? "/admin" : "/"}
									>
										{appUserName}
									</Link>
								</Nav.Link>
							</div>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Navigation;
