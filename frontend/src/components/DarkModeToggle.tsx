import React, { useContext, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { Appcontext } from "../App";
const DarkLightModeToggle = () => {
	const { darkMode, setDarkMode } = useContext(Appcontext)!;

	const [checked, setChecked] = useState(false);
	const [radioValue, setRadioValue] = useState("1");
	const radios = [
		{ name: "Light", value: "1" },
		{ name: "Dark", value: "2" },
	];

	return (
		<>
			{console.log(radioValue, darkMode)}
			<ButtonGroup>
				{radios.map((radio, idx) => (
					<ToggleButton
						key={idx}
						id={`radio-${idx}`}
						type="radio"
						variant={idx == 1 ? "outline-dark" : "outline-secondary"}
						style={{ color: "black" }}
						name="radio"
						value={radio.value}
						checked={radioValue === radio.value}
						onChange={(e) => {
							setRadioValue(e.currentTarget.value);
							console.log(e.currentTarget.value);
							e.currentTarget.value == "1"
								? setDarkMode(false)
								: setDarkMode(true);
						}}
					>
						{radio.name}
					</ToggleButton>
				))}
			</ButtonGroup>
		</>
	);
};

export default DarkLightModeToggle;
