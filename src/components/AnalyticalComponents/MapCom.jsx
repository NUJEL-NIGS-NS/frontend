import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DropdownButton, Dropdown } from "react-bootstrap";
const MapCom = ({ data }) => {
  const [manName, setmanName] = useState("");

  const position = [16.5131, 80.5165];

  const icon = L.icon({
    iconUrl: "images/nav.png",
    iconSize: [32, 32],
  });
  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title="Month">
        {Object.keys(data).map((item, index) => (
          <Dropdown.Item key={index} onClick={() => setmanName(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <MapContainer
        style={{ width: "100%", height: "400px" }}
        center={position}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />
        {data[manName]?.map((item) => (
          <Marker key={item.Place} position={item.PlaceGeo} icon={icon}>
            <Popup>{item.Place}</Popup>
          </Marker>
        ))}

       {data[manName]
          ?.filter((item, index, array) => {
            // Return true for the first occurrence of each unique item
            return (
              array.findIndex((element) => element.Head_quarters === item.Head_quarters) === index
            );
          })
          .map((item) => (
            <Marker key={item.Head_quarters} position={item.HqGeo} icon={icon}>
              <Popup>{item.Head_quarters}</Popup>
            </Marker>
          ))}

        {data[manName]
          ?.filter((item, index, array) => {
            // Return true for the first occurrence of each unique item
            return (
              array.findIndex((element) => element.City === item.City) === index
            );
          })
          .map((item) => (
            <Marker key={item.City} position={item.cityGeo} icon={icon}>
              <Popup>{item.City}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapCom;
