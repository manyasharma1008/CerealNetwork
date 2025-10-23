import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = window.innerHeight * 0.8;
      setScrollProgress(Math.min(scrollTop / maxScroll, 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollProgress > 0.2 && scrollProgress < 1) {
      const newParticles = Array.from({ length: 10 }).map(() => ({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * 50 + 40,
        size: Math.random() * 4 + 2,
      }));
      setParticles((prev) => [...prev.slice(-50), ...newParticles]);
    }
  }, [scrollProgress]);

  const title = "THE CEREAL NETWORK".split("");

  return (
    <nav className={`navbar ${scrollProgress > 0.2 ? "scrolled" : ""}`}>
      <div className="particle-layer">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: 0,
              y: -Math.random() * 120 - 50,
              x: p.x + (Math.random() - 0.5) * 40,
            }}
            transition={{
              duration: Math.random() * 1.8 + 0.7,
              ease: "easeOut",
            }}
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="title-container">
        {title.map((char, i) => (
          <motion.span
            key={i}
            className="title-letter"
            style={{
              display: "inline-block",
              marginRight: char === " " ? "8px" : "0px",
              textShadow: `0 0 ${10 - scrollProgress * 8}px rgba(0, 225, 255, ${
                0.9 - scrollProgress * 0.8
              })`,
              filter: `blur(${scrollProgress * 3}px)`,
            }}
            animate={{
              y: scrollProgress * (i % 2 === 0 ? -80 : 80),
              rotate: scrollProgress * (i % 2 === 0 ? -15 : 15),
              opacity: 1 - scrollProgress * 1.3,
              scale: 1 - scrollProgress * 0.3,
            }}
            transition={{ duration: 0.6 }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <ul className="nav-links">
        {pathname !== "/" && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        {pathname !== "/map" && (
          <li>
            <Link to="/map">Map</Link>
          </li>
        )}
        {pathname !== "/help" && (
          <li>
            <Link to="/help">Help</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
