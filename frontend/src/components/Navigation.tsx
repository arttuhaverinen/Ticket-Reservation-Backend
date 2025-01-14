import { useContext } from "react";
import { Appcontext } from "../App";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import "../App.css";

const Navigation = () => {
	const {
		appUserName,
		setAppUserName,
		appToken,
		setAppToken,
		setIsAdmin,
		profilePicture,
		setProfilePicture,
	} = useContext(Appcontext)!;

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
		<Navbar
			style={{ minHeight: "100px" }}
			expand="lg"
			className="bg-body-tertiary d-flex"
		>
			<Container style={{ width: "95%" }} fluid>
				<Link to={"/profile"}>
					{appToken && (
						<>
							<div className="d-flex d-block d-lg-none rounded navbar-profile-hover">
								<Image
									className="ms-auto"
									src={
										profilePicture
											? profilePicture
											: "https://placehold.co/100x100"
									}
									style={{
										width: "75px",
										height: "75px",
										objectFit: "cover",
										overflow: "hidden",
									}}
									key={profilePicture}
									roundedCircle
								/>{" "}
								<Navbar.Text className="mx-2 d-flex align-items-center justify-content-center ">
									<p className="m-0 text-center navbar-profile-hover">
										<b>{appUserName}</b>
									</p>
								</Navbar.Text>
							</div>
						</>
					)}
				</Link>

				<Navbar.Collapse className="justify-content-start">
					{appToken && <hr className="d-block d-lg-none" />}
					<Nav.Link className="me-3">
						<Link to={"/"}>
							<h5 className="navigation-link-hover text-dark">Etusivu</h5>
						</Link>
					</Nav.Link>
					{!appToken ? (
						<>
							<Nav.Link className="me-3">
								<Link to={"/login"}>
									{" "}
									<h5 className="navigation-link-hover text-dark">
										Kirjaudu sisään
									</h5>
								</Link>
							</Nav.Link>
							<Nav.Link className="me-3">
								<Link to={"/register"}>
									{" "}
									<h5 className="navigation-link-hover text-dark">
										Rekisteröidy
									</h5>
								</Link>
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
								<h5 className="navigation-link-hover text-dark">
									Kirjaudu ulos
								</h5>
							</Link>
						</Nav.Link>
					)}
				</Navbar.Collapse>
				<Link to={"/profile"}>
					{appToken && (
						<>
							<div className="d-flex d-none d-lg-flex rounded navbar-profile-hover">
								<Image
									className="ms-auto"
									src={
										profilePicture
											? profilePicture
											: "https://placehold.co/100x100"
									}
									onError={() => {
										setProfilePicture("https://placehold.co/100x100");
									}}
									style={{
										width: "75px",
										height: "75px",
										objectFit: "cover",
										overflow: "hidden",
									}}
									key={profilePicture}
									roundedCircle
								/>{" "}
								<Navbar.Text className="mx-2 d-flex align-items-center justify-content-center ">
									<p className="m-0 text-center">
										<b>{appUserName}</b>
									</p>
								</Navbar.Text>
							</div>
						</>
					)}
				</Link>
				<Navbar.Toggle className=" mx-3 my-4 position-absolute end-0 top-0" />
			</Container>
		</Navbar>
	); /*
		<div>
			<Navbar
				expand="md"
				className="bg-body-tertiary justify-content-between border w-100"
				expanded={expanded}
			>
				<Container>
					<Navbar.Brand></Navbar.Brand>
					<Navbar.Toggle
						onClick={() => setExpanded(!expanded)}
						aria-controls="basic-navbar-nav"
					/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="w-100 ">
							<Nav.Link>
								<Link to={"/"}>
									<h5>Etusivu</h5>
								</Link>
							</Nav.Link>
							{!appToken ? (
								<>
									<Nav.Link>
										<Link to={"/login"}>
											{" "}
											<h5>Kirjaudu</h5>
										</Link>
									</Nav.Link>
									<Nav.Link className="">
										<Link to={"/register"}>
											{" "}
											<h5>Rekisteröidy</h5>
										</Link>
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
										<h5>Rekisteröidy</h5>
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
	</NavDropdown> 

							<Row className=" ">
								<Col xs={6}></Col>
								<Col xs={2}>
									{" "}
									<Image
										className="ms-auto"
										src={
											profilePicture
												? profilePicture
												: "https://placehold.co/100x100"
										}
										style={{
											width: "100px",
											height: "100px",
											objectFit: "cover",
											overflow: "hidden",
										}}
										key={profilePicture}
										roundedCircle
									/>{" "}
								</Col>
								<Col xs={4}>
									<Nav.Link
										className={`nav-link-account w-100  text-end-responsive}`}
									>
										<Link
											className="w-100 text-end-responsive"
											to={appUserName ? "/admin" : "/"}
										>
											<h5>{appUserName}</h5>
											{appUserName}
										</Link>
									</Nav.Link>
								</Col>
							</Row>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}*/
};
export default Navigation;
