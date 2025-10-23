import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapStyles.css";

export default function MapView() {
  const [selected, setSelected] = useState(null);

  const chennaiCenter = [13.0827, 80.2707];
  const zoom = 12;

  const fridges = [
    {
      id: 1,
      position: [13.07, 80.24],
      address: "T Nagar, Chennai",
      pincode: "600017",
      fridgeNo: "F-101",
      status: "Red",
      itemsRequired: "Rice, Milk, Fruits",
    },
    {
      id: 2,
      position: [13.05, 80.25],
      address: "Saidapet, Chennai",
      pincode: "600015",
      fridgeNo: "F-102",
      status: "Yellow",
      itemsRequired: "Bread, Eggs",
    },
    {
      id: 3,
      position: [13.03, 80.23],
      address: "Guindy, Chennai",
      pincode: "600032",
      fridgeNo: "F-103",
      status: "Green",
      itemsRequired: "None",
    },
    {
      id: 4,
      position: [13.09, 80.27],
      address: "Anna Nagar, Chennai",
      pincode: "600040",
      fridgeNo: "F-104",
      status: "Red",
      itemsRequired: "Vegetables, Pulses",
    },
    {
      id: 5,
      position: [13.11, 80.20],
      address: "Ambattur, Chennai",
      pincode: "600053",
      fridgeNo: "F-105",
      status: "Yellow",
      itemsRequired: "Milk, Bread",
    },
    {
      id: 6,
      position: [13.06, 80.28],
      address: "Mylapore, Chennai",
      pincode: "600004",
      fridgeNo: "F-106",
      status: "Green",
      itemsRequired: "None",
    },
    {
      id: 7,
      position: [13.08, 80.21],
      address: "Koyambedu, Chennai",
      pincode: "600107",
      fridgeNo: "F-107",
      status: "Red",
      itemsRequired: "Fruits, Rice",
    },
    {
      id: 8,
      position: [13.10, 80.26],
      address: "Kilpauk, Chennai",
      pincode: "600010",
      fridgeNo: "F-108",
      status: "Yellow",
      itemsRequired: "Milk, Eggs",
    },
    {
      id: 9,
      position: [13.00, 80.27],
      address: "Velachery, Chennai",
      pincode: "600042",
      fridgeNo: "F-109",
      status: "Green",
      itemsRequired: "None",
    },
    {
      id: 10,
      position: [12.98, 80.22],
      address: "Tambaram, Chennai",
      pincode: "600045",
      fridgeNo: "F-110",
      status: "Yellow",
      itemsRequired: "Bread, Vegetables",
    },
  ];

  const getColor = (status) => {
    switch (status) {
      case "Red":
        return "#e63946";
      case "Yellow":
        return "#ffb703";
      case "Green":
        return "#2a9d8f";
      default:
        return "#1d3557";
    }
  };

  return (
    <div className="map-container">
      <MapContainer
        center={chennaiCenter}
        zoom={zoom}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {fridges.map((fridge) => (
          <CircleMarker
            key={fridge.id}
            center={fridge.position}
            radius={9}
            color={getColor(fridge.status)}
            fillOpacity={0.9}
            eventHandlers={{
              click: () => setSelected(fridge.id),
            }}
          >
            {selected !== fridge.id && (
              <Tooltip
                direction="top"
                offset={[0, -10]}
                opacity={1}
                className="custom-tooltip fade-in"
              >
                <b>{fridge.address}</b>
                <br />
                Pincode: {fridge.pincode}
                <br />
                Fridge No: {fridge.fridgeNo}
                <br />
                Status: {fridge.status}
                <br />
                Items: {fridge.itemsRequired}
              </Tooltip>
            )}

            {selected === fridge.id && (
              <Popup onClose={() => setSelected(null)}>
                <h4>{fridge.address}</h4>
                <p>Status: {fridge.status}</p>
                <button
                  className="popup-button"
                  onClick={() => alert("Message sent!")}
                >
                  Send Message
                </button>
              </Popup>
            )}
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
