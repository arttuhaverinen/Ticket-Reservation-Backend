import { useState, useEffect } from "react";
import Post from "./Post";
import { Button, Container, Placeholder } from "react-bootstrap";

interface postInterface {
	postId: number;
	postTitle: string;
	postContent: string;
	postType: string;
}

const Posts = (/*props: postInterface*/) => {
	const [page, setPage] = useState<number>(1);
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [posts, setPosts] = useState<postInterface[]>();
	useEffect(() => {
		//console.log(localStorage.getItem("accesstoken"));
		console.log("fetching posts");
		fetch(`${baseurl}/api/posts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				//Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				setPosts(res);
			})
			.catch((err) => {
				console.error("Error fetching posts:", err);
				setPosts([]); // Set fallback state or handle error UI
			});
	}, []);
	return (
		<Container className="py-5">
			<h2 className="text-center">Ilmoitukset</h2>
			{!posts && (
				<div>
					{Array.from([2]).map(() => {
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
				<Container className="p-3 mb-1  rounded">
					{posts &&
						posts.map((post, index) => {
							if (page * 4 > index && (page - 1) * 4 <= index) {
								return (
									<Post
										postId={post.postId}
										postTitle={post.postTitle}
										postContent={post.postContent}
										postType={post.postType}
									/>
								);
							}
						})}
				</Container>
			)}
			{posts && (
				<Container className="d-flex justify-content-center align-items-center  p-3 mb-5  rounded ">
					<h3 className="mx-3">Sivut: </h3>
					{posts &&
						posts.map((post, index) => {
							if (index % 4 == 0) {
								return (
									<Button
										onClick={() => setPage(index / 4 + 1)}
										variant={page == index / 4 + 1 ? "primary" : "info"}
										className="rounded-circle mx-1"
										style={{ width: "50px", height: "50px" }}
									>
										{index / 4 + 1}
									</Button>
								);
							}
						})}
				</Container>
			)}
		</Container>
	);
};

export default Posts;
