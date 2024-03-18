import React from "react";
import { TileLayer, Popup, Marker, MapContainer } from "react-leaflet";
import "./eventMap.css";
import { MdLocationPin } from "react-icons/md";

function EventMap({ coords }: any) {
  const position = coords;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossOrigin=""
      />
      {/* @ts-ignore */}
      <MapContainer center={position} zoom={12} className="leaflet-container">
        {/* @ts-ignore */}
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup></Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default EventMap;
