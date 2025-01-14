import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Appcontext } from "../App";
import Posts from "./Posts";
const AdminCreatePost = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;

	const [postTitle, setPostTitle] = useState<string>("");
	const [postContent, setPostContent] = useState<string>("");
	const [postType, setPostType] = useState<string>("");

	const { appToken } = useContext(Appcontext)!;

	const handleCreatePost = (e: React.FormEvent<HTMLFormElement>): void => {
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
			<Form
				onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleCreatePost(e)}
			>
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
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPostContent(e.target.value)
						}
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
			<hr className="my-5" />
			<Posts />
		</div>
	);
};

export default AdminCreatePost;
