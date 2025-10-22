import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm py-4 px-10 flex items-center justify-between z-50">
      {/* Brand Name on Left */}
      <div className="text-2xl font-bold text-gray-900 tracking-wide">
        The Cereal Network
      </div>

      {/* Navigation Links on Right */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Home
        </Link>
        <Link
          to="/map"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Map
        </Link>
        <Link
          to="/donate"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Donate
        </Link>
        <Link
          to="/about"
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          About Us
        </Link>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Login / Signup
        </Link>
      </div>
    </nav>
  );
}
