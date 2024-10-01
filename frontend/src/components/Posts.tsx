import React, { useState, useContext, useEffect } from "react";
import Post from "./Post";
import { Card, Placeholder } from "react-bootstrap";

interface postInterface {
	postId: number;
	postTitle: string;
	postContent: string;
	postType: string;
}

const Posts = (props: postInterface) => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [posts, setPosts] = useState<postInterface[]>();
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
		<div className="my-5 w-100 shadow  p-3 mb-5 bg-white rounded ">
			<h2 className="text-center">Ilmoitukset</h2>
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
		</div>
	);
};

export default Posts;
