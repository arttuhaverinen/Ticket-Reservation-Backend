import React, { useContext, useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { Appcontext } from "../App";
const DarkModeToggle = () => {
	const { darkMode, setDarkMode } = useContext(Appcontext)!;

	const [checked, setChecked] = useState(false);
	const [radioValue, setRadioValue] = useState("1");
	const radios = [
		{ name: "Light", value: "1" },
		{ name: "Dark", value: "2" },
	];

	useEffect(() => {
		if (darkMode) {
			localStorage.setItem("darkmode", "true");
		} else {
			localStorage.setItem("darkmode", "false");
		}
	}, [darkMode]);

	return (
		<div className="">
			<ButtonGroup>
				<ToggleButton
					type="radio"
					variant={"outline-secondary"}
					style={{
						color: darkMode ? "black" : "yellow", // Text color
						backgroundColor: darkMode ? "#303030" : "#303030", // Background color based on dark mode
					}}
					name="radio"
					onClick={(e) => {
						setDarkMode(false);
					}}
					id={""}
					value={""}
				>
					<i className="fa fa-lightbulb-o text-center " aria-hidden="true"></i>
				</ToggleButton>

				<ToggleButton
					type="radio"
					variant={"outline-secondary"}
					style={{
						color: darkMode ? "yellow" : "white", // Text color
						backgroundColor: darkMode ? "#303030" : "#303030", // Background color based on dark mode
					}}
					name="radio"
					onClick={(e) => {
						setDarkMode(true);
					}}
					id={""}
					value={""}
				>
					<i className="fa fa-moon-o text-center " aria-hidden="true"></i>
				</ToggleButton>
			</ButtonGroup>
		</div>
	);
};

export default DarkModeToggle;
