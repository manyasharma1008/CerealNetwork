import React from "react";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <h2 className="text-4xl font-semibold mb-3 text-gray-900">About Us</h2>
      <p className="text-gray-600 max-w-xl">
        The Cereal Network is a community-driven initiative designed to
        distribute food efficiently and fairly across local areas using
        technology and kindness.
      </p>
    </div>
  );
}
