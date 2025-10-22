import React from "react";
import { Link } from "react-router-dom";

export default function BrandPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-blue-50 text-center">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4 mt-20">
        The Cereal Network
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Connecting communities through shared kindness 🌾
      </p>
      <Link
        to="/map"
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-all shadow-md"
      >
        Explore Map
      </Link>
    </div>
  );
}
