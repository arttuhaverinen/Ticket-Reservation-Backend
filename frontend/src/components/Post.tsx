import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Appcontext } from "../App";

interface postInterface {
	postId: number;
	postTitle: string;
	postContent: string;
	postType: string;
}

const Post = (props: postInterface) => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [bgColor, setBgColor] = useState("black");

	const { appUserName, setAppUserName, appToken, setAppToken, isAdmin } =
		useContext(Appcontext);

	useEffect(() => {
		handleBgColor();
	}, []);

	const handleBgColor = () => {
		if (props.postType == "warning") {
			setBgColor("danger");
		}
		if (props.postType == "info") {
			setBgColor("light");
		}
	};

	const handlePostDelete = () => {
		console.log(appToken);
		fetch(`${baseurl}/${props.postId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${appToken}`,
			},
		})
			.then((res) => res.json())
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div className={`border rounded p-2 my-3 border-${bgColor}`}>
			<Row className="w-100 justify-content-between">
				{console.log(props)}

				<Col className="justify-content-start" xs={4}>
					<h6>{new Date().toISOString().slice(0, 10)}</h6>
					<h5 style={{ color: bgColor }}>{props.postTitle}</h5>
				</Col>
				<Col xs={2} className="justify-content-end align-items-end">
					{" "}
					{isAdmin && (
						<Button
							onClick={() => handlePostDelete()}
							className="btn btn-danger p-1 m-0"
						>
							Delete
						</Button>
					)}
				</Col>
			</Row>
			<p className=" text-start">{props.postContent}</p>
		</div>
	);
};

export default Post;
