import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapStyles.css";

export default function MapView() {
  const [darkMode, setDarkMode] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  const darkTiles =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
  const lightTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const chennaiCenter = [13.0827, 80.2707];

  const fridges = [
    {
      id: 1,
      name: "T Nagar Community Fridge",
      address: "Pondy Bazaar, T Nagar, Chennai - 600017",
      position: [13.0358, 80.2302],
      status: "Full",
      color: "green",
      itemsToRefill: [],
    },
    {
      id: 2,
      name: "Marina Beach Free Pantry",
      address: "Kamarajar Salai, Marina Beach, Chennai - 600005",
      position: [13.049, 80.2824],
      status: "Running Low",
      color: "yellow",
      itemsToRefill: ["Vegetables", "Biscuits"],
    },
    {
      id: 3,
      name: "Guindy Fridge Point",
      address: "Race Course Road, Guindy, Chennai - 600032",
      position: [12.986, 80.243],
      status: "Needs Refill",
      color: "red",
      itemsToRefill: ["Fruits", "Milk", "Rice"],
    },
    {
      id: 4,
      name: "Velachery Sharing Spot",
      address: "100 Feet Road, Velachery, Chennai - 600042",
      position: [12.979, 80.22],
      status: "Full",
      color: "green",
      itemsToRefill: [],
    },
    {
      id: 5,
      name: "Adyar Free Fridge",
      address: "LB Road, Adyar, Chennai - 600020",
      position: [13.006, 80.256],
      status: "Running Low",
      color: "yellow",
      itemsToRefill: ["Milk Packets"],
    },
    {
      id: 6,
      name: "Anna Nagar Pantry",
      address: "2nd Avenue, Anna Nagar, Chennai - 600040",
      position: [13.09, 80.22],
      status: "Full",
      color: "green",
      itemsToRefill: [],
    },
    {
      id: 7,
      name: "Perambur Public Fridge",
      address: "Paper Mills Road, Perambur, Chennai - 600011",
      position: [13.12, 80.24],
      status: "Needs Refill",
      color: "red",
      itemsToRefill: ["Rice", "Cereals", "Vegetables"],
    },
    {
      id: 8,
      name: "Besant Nagar Sharing Fridge",
      address: "Elliot's Beach Road, Besant Nagar, Chennai - 600090",
      position: [13.0, 80.27],
      status: "Running Low",
      color: "yellow",
      itemsToRefill: ["Eggs", "Fruits"],
    },
  ];

  const statusColor = {
    green: "#22c55e",
    yellow: "#eab308",
    red: "#ef4444",
  };

  // Disable Leaflet's built-in fade animation on tooltips globally
  useEffect(() => {
    L.Map.mergeOptions({ fadeAnimation: false });
  }, []);

  const PopupAnimation = () => {
    const map = useMap();
    useEffect(() => {
      setMapReady(true);
    }, [map]);
    return null;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          background: darkMode ? "#1e293b" : "#f1f5f9",
          color: darkMode ? "#f8fafc" : "#1e293b",
          border: "none",
          borderRadius: "8px",
          padding: "8px 14px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
        }}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <MapContainer
        center={chennaiCenter}
        zoom={12}
        style={{ height: "100vh", width: "100vw" }}
        whenReady={() => setMapReady(true)}
      >
        <PopupAnimation />
        <TileLayer url={darkMode ? darkTiles : lightTiles} />

        {mapReady &&
          fridges.map((f) => (
            <CircleMarker
              key={f.id}
              center={f.position}
              radius={10}
              pathOptions={{
                color: statusColor[f.color],
                fillColor: statusColor[f.color],
                fillOpacity: 0.9,
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -12]}
                opacity={1}
                permanent={false}
                sticky={true}
                interactive={true}
                className="custom-tooltip"
              >
                <div
                  style={{
                    minWidth: "180px",
                    background:
                      f.color === "green"
                        ? "rgba(34,197,94,0.15)"
                        : f.color === "yellow"
                        ? "rgba(234,179,8,0.15)"
                        : "rgba(239,68,68,0.15)",
                    color: darkMode ? "#f8fafc" : "#1e293b",
                    border: `2px solid ${statusColor[f.color]}`,
                    padding: "8px 14px",
                    borderRadius: "999px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    lineHeight: "1.4",
                    backdropFilter: "blur(6px)",
                    fontWeight: 500,
                  }}
                >
                  <strong>{f.name}</strong>
                  <br />
                  🏠 <b>Address:</b> {f.address}
                  <br />
                  ⚙️ <b>Status:</b> {f.status}
                  <br />
                  🍎 <b>Items to Refill:</b>{" "}
                  {f.itemsToRefill.length > 0
                    ? f.itemsToRefill.join(", ")
                    : "None"}
                </div>
              </Tooltip>

              <Popup>
                <div
                  style={{
                    textAlign: "center",
                    padding: "10px 12px",
                    borderRadius: "14px",
                    border: `2px solid ${statusColor[f.color]}`,
                    boxShadow: `0 0 12px ${statusColor[f.color]}55`,
                    background: darkMode
                      ? "rgba(30,41,59,0.95)"
                      : "rgba(255,255,255,0.95)",
                    color: darkMode ? "#f8fafc" : "#1e293b",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <h4
                    style={{
                      margin: "4px 0",
                      color: statusColor[f.color],
                      fontWeight: "600",
                    }}
                  >
                    {f.name}
                  </h4>
                  <p style={{ lineHeight: "1.4", marginBottom: "8px" }}>
                    Want to help restock or report status updates?
                    <br />
                    📩 <b>Contact this fridge via message!</b>
                  </p>
                  <button
                    onClick={() => alert(`Message sent to ${f.name}!`)}
                    style={{
                      marginTop: "6px",
                      backgroundColor: statusColor[f.color],
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      cursor: "pointer",
                      fontWeight: "600",
                      boxShadow: `0 3px 10px ${statusColor[f.color]}55`,
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
          background: darkMode
            ? "rgba(30,41,59,0.85)"
            : "rgba(255,255,255,0.85)",
          color: darkMode ? "#f8fafc" : "#1e293b",
          padding: "12px 16px",
          borderRadius: "10px",
          fontSize: "0.9rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
          🧭 Status Legend
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              background: statusColor.green,
              borderRadius: "50%",
            }}
          ></span>
          Full / Healthy Stock
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              background: statusColor.yellow,
              borderRadius: "50%",
            }}
          ></span>
          Running Low
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              background: statusColor.red,
              borderRadius: "50%",
            }}
          ></span>
          Needs Refill
        </div>
      </div>
    </div>
  );
}
