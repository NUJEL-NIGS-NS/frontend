import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
const MapCom = () => {
  const position = [16.5131, 80.5165];
  const markers = [
    { position: [16.5131, 80.5165], name: "Marker 1" },
    { position: [51.5, -0.1], name: "Marker 2" },
    { position: [51.49, -0.12], name: "Marker 3" }
  ];
  const icon = L.icon({
    iconUrl: "images/nav.png",
    iconSize: [32, 32],
  });
  return (
    <div>
      <MapContainer
        style={{ width: "100%", height: "400px" }}
        center={position}
        zoom={10}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />
        {markers.map((marker) => (
          <Marker key={marker.name} position={marker.position} icon={icon}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapCom;
