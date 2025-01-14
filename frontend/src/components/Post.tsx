import { useEffect, useState, useContext } from "react";
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
	const [bgColor, setBgColor] = useState("primary");
	const [inAdminPanel] = useState(
		location.pathname.includes("profile") ? true : false
	);

	const { appToken, isAdmin } = useContext(Appcontext)!;

	useEffect(() => {
		handleBgColor();
	}, []);

	const handleBgColor = () => {
		if (props.postType == "warning") {
			setBgColor("danger");
		}
		if (props.postType == "info") {
			setBgColor("warning");
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
		<div
			className={` p-2 my-4 shadow bg-white border-start border-5 border-${bgColor}`}
		>
			{isAdmin && inAdminPanel && (
				<div className="d-flex w-100">
					<Button
						onClick={() => handlePostDelete()}
						className="btn btn-danger ms-auto    "
					>
						Poista ilmoitus
					</Button>
				</div>
			)}
			<Row className="w-100 justify-content-between">
				<Col className="justify-content-start" xs={10}>
					<h6>{new Date().toISOString().slice(0, 10)}</h6>
					<h5 style={{ color: bgColor }}>{props.postTitle}</h5>
				</Col>
				<Col xs={2} className="justify-content-end align-items-end">
					{" "}
					{bgColor == "danger" && (
						<div className="d-flex justify-content-end">
							<i className="bi bi-exclamation-triangle text-danger fs-1"></i>
						</div>
					)}
				</Col>
			</Row>
			<p className=" text-start">{props.postContent}</p>
		</div>
	);
};

export default Post;
