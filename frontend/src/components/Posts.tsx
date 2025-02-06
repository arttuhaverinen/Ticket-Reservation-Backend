import { useState, useEffect } from "react";
import Post from "./Post";
import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

interface postInterface {
	postId: number;
	postTitle: string;
	postContent: string;
	postType: string;
}

const Posts = (/*props: postInterface*/) => {
	const mobileScreen = useMediaQuery({ query: "(max-width: 991px)" });
	const [page, setPage] = useState<number>(1);
	const [gridView, setGridView] = useState(false);
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [posts, setPosts] = useState<postInterface[]>();

	useEffect(() => {
		mobileScreen == true && setGridView(false);
	}, [mobileScreen]);
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
			{console.log("mobile ", mobileScreen)}
			<Container>
				<Row className="d-flex ">
					<Col className="d-flex" xs={10}>
						{" "}
						<h2 className="text-center mx-3 ">Ilmoitukset</h2>{" "}
					</Col>
					<Col xs={2}>
						{" "}
						<div
							className="d-flex ms-auto d-none d-lg-block
 "
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								fill="currentColor"
								className={`"bi" "bi-grid-3x2-gap-fill" "m-3"  ${
									gridView ? "text-primary" : {}
								}`}
								viewBox="0 0 16 16"
								onClick={() => setGridView(true)}
								style={{ cursor: "pointer", margin: "5px" }}
							>
								<path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								fill="currentColor"
								className={`"bi" "bi-list-task" "mx-3" ${
									gridView ? "{}" : "text-primary"
								}`}
								viewBox="0 0 16 16"
								onClick={() => setGridView(false)}
								style={{ cursor: "pointer", margin: "5px" }}
							>
								<path
									fill-rule="evenodd"
									d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
								/>
								<path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
								<path
									fill-rule="evenodd"
									d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
								/>
							</svg>
						</div>
					</Col>
				</Row>
			</Container>
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
			{posts && gridView == false && (
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
			{posts && gridView == true && (
				<Container className="p-3 mb-1  rounded">
					<Row className="">
						{posts &&
							posts.map((post, index) => {
								if (page * 6 > index && (page - 1) * 6 <= index) {
									return (
										<Col xs={6} className="mb-3">
											<Post
												postId={post.postId}
												postTitle={post.postTitle}
												postContent={post.postContent}
												postType={post.postType}
											/>
										</Col>
									);
								}
							})}
					</Row>
				</Container>
			)}
			{posts && (
				<Container className="d-flex justify-content-center align-items-center  p-3 mb-5  rounded ">
					<h3 className="mx-3">Sivut: </h3>
					{posts &&
						gridView == false &&
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
					{posts &&
						gridView == true &&
						posts.map((post, index) => {
							if (index % 6 == 0) {
								return (
									<Button
										onClick={() => setPage(index / 6 + 1)}
										variant={page == index / 6 + 1 ? "primary" : "info"}
										className="rounded-circle mx-1"
										style={{ width: "50px", height: "50px" }}
									>
										{index / 6 + 1}
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
