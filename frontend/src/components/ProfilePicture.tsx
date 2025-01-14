import React, { useState, useContext } from "react";
import { Appcontext } from "../App";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { Form, Button } from "react-bootstrap";

const ProfilePicture = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [file, setFile] = useState<null | Blob>(null);
	const { appUserName, appToken, profilePicture, setProfilePicture } =
		useContext(Appcontext)!;

	const fetchUpdatedProfileImage = () => {
		if (appUserName && appToken) {
			fetch(`${baseurl}/api/User`, {
				headers: { Authorization: `Bearer ${appToken}` },
			})
				.then((res) => res.json())
				.then((res) => {
					console.log("IMAGE: ", res);
					return fetch(`${baseurl}/api/minio/${res.profileImage}`);
				})
				.then((res) => res.json())
				.then((res) => setProfilePicture(res.url));
		}
	};

	const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (file) {
			const formData = new FormData();
			formData.append("formFile", file);
			try {
				fetch(`${baseurl}/api/minio/upload`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
					},
					method: "POST",
					body: formData,
				})
					.then((res) => res.json())
					.then(() => fetchUpdatedProfileImage());
			} catch (error) {}
		}
	};

	/*
	const fetchProfileImage = () => {
		try {
			fetch(`${baseurl}/api/minio`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					setPicture(res.url);
					setProfilePicture(res.url);
				});
		} catch (error) {}
	};

	const testUser = () => {
		try {
			fetch(`${baseurl}/api/User`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
				},
				method: "GET",
			})
				.then((res) => res.json())
				.then((res) => console.log(res));
		} catch (error) {}
	};
*/
	return (
		<Container className="shadow p-3 my-3 mb-5 bg-white rounded">
			<Row>
				<Col xs={6} md={4}>
					<Image
						w-100
						src={
							profilePicture ? profilePicture : "https://placehold.co/100x100"
						}
						style={{
							width: "100px",
							height: "100px",
							objectFit: "cover",
							overflow: "hidden",
						}}
						key={profilePicture}
					/>
				</Col>
			</Row>

			<Form onSubmit={handleFileSubmit} className="mb-3">
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>Valitse profiilikuva</Form.Label>
					<Form.Control
						type="file"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							e.target.files && setFile(e.target.files[0]);
						}}
					/>
				</Form.Group>
				{file ? (
					<Button variant="primary" type="submit">
						Vaihda profiilikuva
					</Button>
				) : (
					<Button disabled variant="primary" type="submit">
						Vaihda profiilikuva
					</Button>
				)}
			</Form>
		</Container>
	);
};

export default ProfilePicture;
