import React, { useState } from "react";
import minio from "minio";

const Minio = () => {
	let baseurl: string = import.meta.env.VITE_BASEURL;
	const [file, setFile] = useState<null | Blob>(null);
	const [profilePicture, setProfilePicture] = useState<null | string>(null);

	const handleFileSubmit = (e) => {
		e.preventDefault();
		if (file) {
			const formData = new FormData();
			formData.append("formFile", file);
			try {
				fetch(`${baseurl}/api/minio`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
					},
					method: "POST",
					body: formData,
				})
					.then((res) => res.json())
					.then((res) => console.log(res));
			} catch (error) {}
		}
	};

	const fetchProfileImage = () => {
		try {
			fetch(`${baseurl}/api/minio`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
				},
			})
				.then((res) => res.json())
				.then((res) => setProfilePicture(res.url));
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

	return (
		<div>
			{console.log(profilePicture)}

			<form onSubmit={handleFileSubmit}>
				<input type="file" onChange={(e) => setFile(e.target.files[0])} />
				<button type="submit">Upload</button>
			</form>
			<button onClick={() => fetchProfileImage()}>image</button>
			<button onClick={() => testUser()}>user</button>
			<img src={profilePicture ? profilePicture : ""} alt="" />
		</div>
	);
};

export default Minio;
