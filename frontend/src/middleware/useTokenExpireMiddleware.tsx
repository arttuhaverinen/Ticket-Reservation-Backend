import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../App";

const useTokenExpireMiddleware = () => {
	console.log("auth");
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
			console.log("refresh");
			let baseurl: string = import.meta.env.VITE_BASEURL;
			let currentTime = Date.now();
			let tokenCreatedTime = localStorage.getItem("time");
			//let accessToken = localStorage.getItem("accesstoken");
			let expireTime = Number(localStorage.getItem("accessexpire")) || 0;
			let expireTimeLeft =
				(Number(currentTime) - Number(tokenCreatedTime)) / 1000;
			let refreshToken = localStorage.getItem("refreshtoken");

			console.log("auth", expireTimeLeft, expireTime / 2);

			if (expireTimeLeft > expireTime / 2) {
				console.log("refresh accesstoken!");
				console.log(refreshToken);
				fetch(`${baseurl}/auth/refresh`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						//Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({ refreshToken: refreshToken }),
				})
					.then((res) => {
						if (res.status == 400 || res.status == 401) {
							throw new Error();
						}
						return res.json();
					})
					.then((res) => {
						console.log("auth res", res);
						localStorage.setItem("accesstoken", res.accessToken);
						localStorage.setItem("refreshtoken", res.refreshToken);
						localStorage.setItem("accessexpire", res.expiresIn);
						localStorage.setItem("time", Date.now().toString());

						setAppToken(res.accessToken);
					})
					.catch((error) => console.log(error));
			}
		}, [appUserName, setAppToken]);
	}
};

export default useTokenExpireMiddleware;
