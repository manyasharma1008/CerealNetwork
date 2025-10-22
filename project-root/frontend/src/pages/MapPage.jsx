import React from "react";
import MapView from "../components/MapView";

export default function MapPage() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <MapView />
    </div>
  );
}
