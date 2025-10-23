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
  const [activeFridge, setActiveFridge] = useState(null);

  const chennaiCenter = [13.0827, 80.2707];

  const fridges = [
    {
      id: 1,
      name: "T Nagar, Chennai",
      pincode: "600017",
      status: "Green",
      available: "Fruits, Water bottles",
      required: "Bread",
      position: [13.0418, 80.2331],
    },
    {
      id: 2,
      name: "Guindy, Chennai",
      pincode: "600032",
      status: "Yellow",
      available: "Rice packets",
      required: "Milk, Snacks",
      position: [13.0108, 80.2122],
    },
    {
      id: 3,
      name: "Mylapore, Chennai",
      pincode: "600004",
      status: "Red",
      available: "Nothing currently",
      required: "Vegetables, Pulses",
      position: [13.0332, 80.2686],
    },
    {
      id: 4,
      name: "Anna Nagar, Chennai",
      pincode: "600040",
      status: "Red",
      available: "Biscuits, Fruits",
      required: "Rice, Dal, Oil",
      position: [13.0863, 80.2105],
    },
    {
      id: 5,
      name: "Adyar, Chennai",
      pincode: "600020",
      status: "Green",
      available: "Canned food, Juices",
      required: "Snacks, Bread",
      position: [13.0012, 80.255],
    },
  ];

  const getColor = (status) => {
    switch (status) {
      case "Red":
        return "#ff4d4d";
      case "Yellow":
        return "#ffd633";
      case "Green":
        return "#00ff99";
      default:
        return "#00e5ff";
    }
  };

  return (
    <div className="map-page">
      <div className="map-header">
        <h1>Community Fridge Network</h1>
        <p>Hover to explore sharing details. Click to connect with volunteers.</p>
      </div>

      <div className="map-container">
        <MapContainer
          center={chennaiCenter}
          zoom={12.5}
          scrollWheelZoom={true}
          style={{ height: "85vh", borderRadius: "18px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {fridges.map((fridge) => (
  <CircleMarker
    key={fridge.id}
    center={fridge.position}
    pathOptions={{
      color: getColor(fridge.status),
      fillColor: getColor(fridge.status),
      fillOpacity: 0.9,
    }}
    radius={10}
    className={`glow-${fridge.status.toLowerCase()}`}
    eventHandlers={{
      click: () => setActiveFridge(fridge),
    }}
  >
    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
      <div className="tooltip-box">
        <strong>{fridge.name}</strong>
        <br />
        Pincode: {fridge.pincode}
        <br />
        Status: <span className="status">{fridge.status}</span>
        <br />
        <strong>Available:</strong> {fridge.available}
        <br />
        <strong>Required:</strong> {fridge.required}
      </div>
    </Tooltip>
  </CircleMarker>
))}

{/* render popup separately so it shows properly */}
{activeFridge && (
  <Popup
    position={activeFridge.position}
    onClose={() => setActiveFridge(null)}
  >
    <div className="popup-card">
      <h3>{activeFridge.name}</h3>
      <p>
        <strong>Status:</strong> {activeFridge.status}
      </p>
      <p>
        <strong>Items Available:</strong> {activeFridge.available}
      </p>
      <p>
        <strong>Items Required:</strong> {activeFridge.required}
      </p>
      <button
        className="popup-btn"
        onClick={() =>
          alert(`Message sent to ${activeFridge.name} volunteers!`)
        }
      >
        Send Message
      </button>
    </div>
  </Popup>
)}

        </MapContainer>
      </div>
    </div>
  );
}
