import { useContext } from "react";
import { Appcontext } from "../App";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "../App.css";
import Cookies from "js-cookie";

const Navigation = () => {
	const {
		appUserName,
		setAppUserName,
		appToken,
		setAppToken,
		setIsAdmin,
		profilePicture,
		setProfilePicture,
		darkMode,
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
		console.log("cookies");
		console.log(Cookies.get()); // Log all cookies before removal

		Cookies.remove("GoogleCookie");
		Cookies.remove("GoogleCookie", { path: "/" });
	};

	return (
		<Navbar
			expand="lg"
			className={` navbar d-flex ${
				darkMode
					? "navbar-dark  border-bottom border-secondary"
					: "navbar-light bg-light"
			}   `}
			data-testid="navbar"
			style={{ minHeight: "100px" }}
		>
			<Container style={{ width: "95%" }} fluid>
				{console.log("appusername", appUserName, appToken)}

				<Nav.Link className="me-3">
					<Link to={"/"}>
						<div
							className="d-flex align-items-center"
							style={{ minHeight: "100px" }}
						>
							<h5 className="navigation-link-hover roboto-slab-font ">
								<i>Joensuun liikenne</i>
							</h5>
						</div>
					</Link>
				</Nav.Link>

				<Navbar.Toggle
					style={{ marginTop: "30px" }}
					className="navbar-toggler mx-3 border  position-absolute end-0 top-0"
				/>

				<Link to={"/profile"}>
					{appToken && (
						<>
							<div
								className="d-flex justify-content-start d-block d-lg-none rounded navbar-profile-hover "
								style={{ height: "100px" }}
							>
								<Image
									className=""
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
										position: "absolute",
										top: "15px",
										left: "50%",
										zIndex: 1,
									}}
									key={profilePicture}
									roundedCircle
								/>{" "}
								<Navbar.Text className="mx-2 d-flex align-items-center justify-content-center d-none d-lg-block ">
									<p className="m-0 text-center navbar-profile-hover ">
										<b>{appUserName}</b>
									</p>
								</Navbar.Text>
							</div>
						</>
					)}
				</Link>

				<Navbar.Collapse className="justify-content-start">
					<hr className="d-block d-lg-none mt-0" />

					{!appToken ? (
						<>
							<Nav.Link className="me-3">
								<Link to={"/login"}>
									{" "}
									<h5 className="navigation-link-hover ">Kirjaudu sisään</h5>
								</Link>
							</Nav.Link>
							<Nav.Link className="me-3">
								<Link to={"/register"}>
									{" "}
									<h5 className="navigation-link-hover ">Rekisteröidy</h5>
								</Link>
							</Nav.Link>
							<div className="me-3">
								<DarkModeToggle />
							</div>{" "}
						</>
					) : (
						<>
							<Nav.Link className="ms-3">
								<Link
									className=""
									onClick={() => logoutClearLocalStorage()}
									to={"/"}
								>
									{" "}
									<h5 className="navigation-link-hover ">Kirjaudu ulos</h5>
								</Link>
							</Nav.Link>
							<div className="ms-3">
								<DarkModeToggle />
							</div>
						</>
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
								<Navbar.Text className="mx-2 d-flex align-items-center justify-content-center   ">
									<p className="m-0 text-center d-flex d-none d-lg-flex  ">
										<b className="d-none d-sm-block ">{appUserName}</b>
									</p>
								</Navbar.Text>
							</div>
						</>
					)}
				</Link>
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
