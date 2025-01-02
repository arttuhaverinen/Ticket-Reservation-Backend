import React, { useState, useContext, useEffect } from "react";
import Post from "./Post";
import { Card, Col, Container, Placeholder, Row } from "react-bootstrap";

interface postInterface {
	postId: number;
	postTitle: string;
	postContent: string;
	postType: string;
}

const Posts = (/*props: postInterface*/) => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [posts, setPosts] = useState<postInterface[]>();
	const placeholderArray = [1, 2, 3];
	useEffect(() => {
		console.log(localStorage.getItem("accesstoken"));
		fetch(`${baseurl}/api/posts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
			},
		})
			.then((res) => res.json())
			.then((res) => setPosts(res));
	}, []);
	return (
		<Container className="py-5">
			<h2 className="text-center">Ilmoitukset</h2>
			{!posts && (
				<div>
					{Array.from([2]).map((item, index) => {
						return (
							<Container className="p-3 mb-5 bg-white rounded">
								{/* Placeholder Text */}
								<div className="mb-4">
									<Placeholder className="w-100" animation="glow">
										<Placeholder
											style={{ height: "150px" }}
											bg="secondary"
											className="d-block mx-auto"
											xs={10}
										/>
									</Placeholder>
								</div>
								<div className="mb-4">
									<Placeholder className="w-100" animation="glow">
										<Placeholder
											style={{ height: "150px" }}
											bg="secondary"
											className="d-block mx-auto"
											xs={10}
										/>
									</Placeholder>
								</div>
								<div className="mb-4">
									<Placeholder className="w-100" animation="glow">
										<Placeholder
											style={{ height: "150px" }}
											bg="secondary"
											className="d-block mx-auto"
											xs={10}
										/>
									</Placeholder>
								</div>
							</Container>
						);
						{
							/* Placeholder Button 
			<Placeholder.Button animation="glow" xs={4} aria-hidden="true" /> */
						}
					})}
				</div>
			)}
			{posts && (
				<Container className="p-3 mb-5  rounded">
					{posts &&
						posts.map((post) => {
							return (
								<Post
									postId={post.postId}
									postTitle={post.postTitle}
									postContent={post.postContent}
									postType={post.postType}
								/>
							);
						})}
				</Container>
			)}
		</Container>
	);
};

export default Posts;
