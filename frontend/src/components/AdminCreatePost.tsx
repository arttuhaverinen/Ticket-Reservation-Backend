import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Appcontext } from "../App";
const AdminCreatePost = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;

	const [postTitle, setPostTitle] = useState();
	const [postContent, setPostContent] = useState();
	const [postType, setPostType] = useState();

	const { appUserName, setAppUserName, appToken, setAppToken, isAdmin } =
		useContext(Appcontext);

	const handleCreatePost = (e) => {
		e.preventDefault();
		fetch(`${baseurl}/api/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${appToken}`,
			},
			body: JSON.stringify({
				id: 0,
				postTitle: postTitle,
				postContent: postContent,
				postType: postType,
				appUserId: "string",
			}),
		})
			.then((res) => res.json())
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div className=" mx-auto my-5 shadow p-3 mb-5 bg-white rounded">
			<h3>Lisää uusi ilmoitus</h3>
			<Form onSubmit={(e) => handleCreatePost(e)}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Ilmoituksen nimi</Form.Label>
					<Form.Control
						onChange={(e) => setPostTitle(e.target.value)}
						type=""
						placeholder="Post title"
					/>

					<Form.Text className="text-muted"></Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="">
					<Form.Label>Post Content</Form.Label>
					<Form.Control
						onChange={(e) => setPostContent(e.target.value)}
						type=""
						placeholder="Post content"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Post Type</Form.Label>
					<Form.Control
						onChange={(e) => setPostType(e.target.value)}
						type=""
						placeholder="Post type"
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default AdminCreatePost;