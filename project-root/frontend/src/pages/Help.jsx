import React from "react";
import { motion } from "framer-motion";
import "../styles/Help.css";

export default function Help() {
  return (
    <motion.div
      className="help-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="help-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Help & Support
      </motion.h1>

      <motion.p
        className="help-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Need assistance? We’re here to guide you.
      </motion.p>

      {/* Section 1 */}
      <motion.section
        className="help-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <h2>🗺️ Using the Map</h2>
        <p>
          Each dot on the map represents a community fridge in Chennai.
          <br />
          Hover to view its address, fridge status, and required items.
          <br />
          Click on a dot to send a message or connect with the fridge volunteer.
        </p>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        className="help-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <h2>🍱 Fridge Status Colors</h2>
        <ul>
          <li><strong>🟥 Red:</strong> Urgently needs refill.</li>
          <li><strong>🟨 Yellow:</strong> Partially stocked.</li>
          <li><strong>🟩 Green:</strong> Well stocked and running fine.</li>
        </ul>
      </motion.section>

      {/* Section 3 */}
      <motion.section
        className="help-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
      >
        <h2>💬 Contacting Volunteers</h2>
        <p>
          Use the “Send Message” button on the popup to reach local volunteers.
          You may also get a Twilio SMS update for confirmation.
        </p>
      </motion.section>

      {/* Section 4 */}
      <motion.section
        className="help-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        <h2>📞 Need Further Assistance?</h2>
        <p>
          Email us at{" "}
          <a href="mailto:support@thecerealnetwork.org">
            support@thecerealnetwork.org
          </a>{" "}
          or DM us on{" "}
          <a
            href="https://instagram.com/thecerealnetwork"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>.
        </p>
      </motion.section>
    </motion.div>
  );
}
