import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import {
	WiDaySunny,
	WiCloud,
	WiRain,
	WiCloudy,
	WiFog,
	WiSnow,
	WiThunderstorm,
} from "react-icons/wi";
import { WeatherState, WeatherSvg } from "weather-icons-animated";

interface WeatherInterface {
	weathercode: number;
	temperature: number;
}

const weatherCodeMap: Record<number, string> = {
	0: "sunny",
	1: "sunny",
	2: "partlycloudy",
	3: "cloudy",
	45: "fog",
	48: "fog",
	51: "rainy",
	53: "rainy",
	55: "pouring",
	56: "snowy-rainy",
	57: "snowy-rainy",
	61: "rainy",
	63: "rainy",
	65: "pouring",
	66: "snowy-rainy",
	67: "snowy-rainy",
	71: "snowy",
	73: "snowy",
	75: "snowy",
	77: "snowy",
	80: "rainy",
	81: "rainy",
	82: "pouring",
	85: "snowy",
	86: "snowy",
	95: "lightning-rainy",
	96: "lightning-rainy",
	99: "lightning-rainy",
};

const WeatherInfo = (props: WeatherInterface) => {
	const getTemperatureColor = () => {
		switch (true) {
			case props.temperature <= -10:
				return "text-primary";
			case props.temperature <= 0:
				return "text-info";
			case props.temperature <= 10:
				return "text-warning";
			case props.temperature <= 20:
				return "text-danger";
			default:
				return "text-success";
		}
	};

	return (
		<div>
			<div> </div>

			<div className="d-block d-md-flex">
				<p className={`${getTemperatureColor()} me-2`}>{props.temperature}</p>
				<WeatherSvg
					state={
						(weatherCodeMap[props.weathercode] ?? "cloudy") as WeatherState
					}
					width={33}
					height={33}
				/>
			</div>
		</div>
	);
};

export default WeatherInfo;
