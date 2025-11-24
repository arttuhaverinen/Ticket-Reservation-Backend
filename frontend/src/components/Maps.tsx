import React, { useEffect, useRef } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	Tooltip,
	Polyline,
	useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

L.Marker.prototype.options.icon = L.icon({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow,
	iconSize: [25, 41], // default Leaflet size
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
	tooltipAnchor: [16, -28],
});
interface mapsInterface {
	zoom: number | null;
	fromCity: string | null;
	toCity: string | null;
}

const Maps = (props: mapsInterface) => {
	const position: number[] = [60.1699, 24.9384]; // Helsinki

	// Hardcoded locations for now - use database later
	const cityLocations = {
		Joensuu: [62.601, 29.7636],
		Nurmes: [63.5421, 29.1391],
		Tampere: [61.4978, 23.761],
		Kuopio: [62.8924, 27.677],
	};

	// Hardcoded locations for now - use database later
	const markers = [
		{
			geocode: [62.601, 29.7636],
			Popup: "Joensuu",
		},
		{ geocode: [63.5421, 29.1391], Popup: "Nurmes" },
		{ geocode: [61.4978, 23.761], Popup: "Tampere" },
		{ geocode: [62.8924, 27.677], Popup: "Kuopio" },
	];

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

	const Routing = ({ fromCityCoordinates, toCityCoordinates }) => {
		const map = useMap();

		useEffect(() => {
			console.log("map useeffect", fromCityCoordinates);
			if (!map) return;
			console.log("map useeffect control");

			const control = L.Routing.control({
				waypoints: [
					L.latLng(fromCityCoordinates[0], fromCityCoordinates[1]),
					L.latLng(toCityCoordinates[0], toCityCoordinates[1]),
				],
				router: new L.Routing.OSRMv1({
					serviceUrl: "https://routing.openstreetmap.de/routed-car/route/v1",
				}),
				routeWhileDragging: false,
				draggableWaypoints: false,
				addWaypoints: false,
				show: false,
				lineOptions: {
					styles: [{ color: "#007aff", weight: 4 }],
				},
			}).addTo(map);

			// This removes the generated top-right button
			const container = document.querySelector(".leaflet-routing-container");
			if (container) container.remove();

			return () => map.removeControl(control);
		}, [map, fromCityCoordinates, toCityCoordinates]);

		return null;
	};

	return (
		<div style={{ height: "100%", width: "100%" }}>
			<MapContainer
				center={
					midpointCoordinates ? midpointCoordinates : cityLocations.Tampere
				}
				zoomSnap={0.1}
				zoom={props.zoom || 6.5}
				scrollWheelZoom={false}
				zoomControl={true}
				dragging={true}
				doubleClickZoom={true}
				touchZoom={false}
				keyboard={false}
				maxBounds={[
					[59, 19],
					[70, 32],
				]}
				maxBoundsViscosity={1.0}
				whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{toCityCoordinates && (
					<Marker position={fromCityCoordinates}>
						{" "}
						<Tooltip permanent>{props.fromCity}</Tooltip>{" "}
					</Marker>
				)}
				{toCityCoordinates && (
					<Marker position={toCityCoordinates}>
						{" "}
						<Tooltip permanent>{props.toCity}</Tooltip>{" "}
					</Marker>
				)}
				{fromCityCoordinates && toCityCoordinates && (
					<Routing
						fromCityCoordinates={fromCityCoordinates}
						toCityCoordinates={toCityCoordinates}
					/>
				)}
			</MapContainer>
		</div>
	);
};

export default Maps;
