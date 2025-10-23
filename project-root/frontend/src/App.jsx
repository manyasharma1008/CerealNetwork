import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import MapView from "./pages/MapView.jsx";
import Help from "./pages/Help";
import "./App.css";

// ------------------------------
// Home Page
// ------------------------------
// ------------------------------
// Home Page (Simplified)
// ------------------------------
function Home() {
  return (
    <motion.section
      className="home-section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
    >
      <div className="hero-text">
        <h1>Welcome to The Cereal Network</h1>
        <p>No Fridge Left Alone</p>
      </div>

      {/* Our Mission */}
      <motion.div
        className="mission-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>Our Mission</h2>
        <p>
          At CerealNetwork, we strive to foster a compassionate, connected community where no one faces hunger alone. Through our innovative network of community-powered fridges, we enable people from all walks of life to give and receive support seamlessly. Our mission is to inspire collective action, empower kindness, and transform the fight against hunger into a shared story of generosity and impact right here.
        </p>
      </motion.div>

      {/* Reviews & Ratings */}
      <motion.div
        className="reviews-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2>What People Say</h2>
        <div className="review-cards">
          <div className="review-card">
            <p>
              “An amazing initiative! It’s great to see communities come together to
              help those in need.” <br /> — <strong>Priya R.</strong>
            </p>
          </div>
          <div className="review-card">
            <p>
              “I started donating every weekend. The process is simple and
              impactful.” <br /> — <strong>Arun K.</strong>
            </p>
          </div>
          <div className="review-card">
            <p>
              “The map feature makes it super easy to find nearby fridges!”
              <br /> — <strong>Sahana M.</strong>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Us */}
      <motion.div
        className="contact-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Contact Us</h2>
        <p>
          Have questions or ideas to improve our network? We’d love to hear from
          you.
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
    </motion.section>
  );
}

// ------------------------------
// Animated Route Wrapper
// ------------------------------
export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
