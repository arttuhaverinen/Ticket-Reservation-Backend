import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../App";

const useTokenExpireMiddleware = () => {
	const context = useContext(Appcontext);
	if (!context) {
		console.log("no context");
	} else {
		console.log("context ready");
		const {
			appUserName,
			setAppUserName,
			appToken,
			setAppToken,
			isAdmin,
			setIsAdmin,
		} = context;

		console.log(appUserName, appToken, isAdmin);

		useEffect(() => {
			let baseurl: string = import.meta.env.VITE_BASEURL;
			let currentTime = Date.now();
			let tokenCreatedTime = localStorage.getItem("time");
			let expireTime = Number(localStorage.getItem("accessexpire")) || 0;
			let expireTimeLeft =
				(Number(currentTime) - Number(tokenCreatedTime)) / 1000;
			let refreshToken = localStorage.getItem("refreshtoken");
			console.log(expireTimeLeft, expireTime);

			if (expireTimeLeft > expireTime) {
				console.log("refresh accesstoken!");
				console.log(refreshToken);
				fetch(`${baseurl}/refresh`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${refreshToken}`,
					},
					body: JSON.stringify({ refreshToken: refreshToken }),
				})
					.then((res) => res.json())
					.then((res) => {
						console.log(res);
						localStorage.setItem("accesstoken", res.accessToken);
						localStorage.setItem("refreshtoken", res.refreshToken);
						localStorage.setItem("accessexpire", res.expiresIn);
						localStorage.setItem("time", Date.now().toString());

						setAppToken(res.accesstoken);
					})
					.catch((error) => console.log(error));
			}
		}, [appUserName, setAppToken]);
	}
};

export default useTokenExpireMiddleware;