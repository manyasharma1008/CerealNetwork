import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapView from "./pages/MapView.jsx";

import { motion } from "framer-motion";
import "./App.css";

// Home Page
function Home() {
  return (
    <section className="home-section">
      <div className="hero-text">
        <h1>Welcome to The Cereal Network</h1>
        <p>Scroll down to see the animation</p>
      </div>

      {/* About Section */}
      <motion.div
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>About Us</h2>
        <p>
          The Cereal Network is a community-driven initiative to connect local
          food sharing points. Our goal is to make sure that no one goes hungry
          and surplus food finds its way to those who need it.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        className="mission-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>Our Mission</h2>
        <p>
          We’re creating a decentralized system of community fridges powered by
          people, for people. Every fridge has a story, and every donation makes
          a difference.
        </p>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="contact-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Contact Us</h2>
        <p>
          Have questions, suggestions, or want to collaborate? We’d love to hear
          from you.
        </p>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required />
          <button type="submit">Send Message</button>
        </form>
      </motion.div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 The Cereal Network. All rights reserved.</p>
      </footer>
    </section>
  );
}

// Help Page
function Help() {
  return (
    <div className="page">
      <h1>Help Page</h1>
      <p>Need assistance? Contact us for support and guidance.</p>
    </div>
  );
}

// Final Export
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapView />} /> {/* ← Your original map */}
        <Route path="/help" element={<Help />} />
      </Routes>
    </>
  );
}
