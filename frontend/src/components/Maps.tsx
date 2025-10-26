import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface mapsInterface {
	zoom: number | null;
	fromCity: string | null;
	toCity: string | null;
}

const Maps = (props: mapsInterface) => {
	const position: number[] = [60.1699, 24.9384]; // Helsinki

	const cityLocations = {
		Joensuu: [62.601, 29.7636],
		Nurmes: [63.5421, 29.1391],
		Tampere: [61.4978, 23.761],
		Kuopio: [62.8924, 27.677],
	};

	console.log("Joensuu", cityLocations["Joensuu"]);
	let fromCityCoordinates: number[] | null;
	let toCityCoordinates: number[] | null;
	let midpointCoordinates: number[] = cityLocations.Joensuu; // Default

	if (props.fromCity && Object.keys(cityLocations).includes(props.fromCity)) {
		fromCityCoordinates =
			cityLocations[props.fromCity as keyof typeof cityLocations];
	} else {
		fromCityCoordinates = cityLocations.Joensuu; // Default
	}

	if (props.toCity && Object.keys(cityLocations).includes(props.toCity)) {
		toCityCoordinates =
			cityLocations[props.toCity as keyof typeof cityLocations];
	} else {
		toCityCoordinates = cityLocations.Joensuu; // Default
	}

	if (fromCityCoordinates && toCityCoordinates) {
		midpointCoordinates = [
			(fromCityCoordinates[0] + toCityCoordinates[0]) / 2,
			(fromCityCoordinates[1] + toCityCoordinates[1]) / 2,
		];
	}

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<MapContainer
				center={
					midpointCoordinates ? midpointCoordinates : cityLocations.Tampere
				}
				zoom={props.zoom || 6}
				scrollWheelZoom={false}
				zoomControl={true}
				dragging={true}
				doubleClickZoom={true}
				touchZoom={false}
				keyboard={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</div>
	);
};

export default Maps;
