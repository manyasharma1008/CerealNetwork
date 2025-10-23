import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Particles({ active, intensity = 0 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      const batch = Array.from({ length: Math.floor(8 + intensity * 20) }).map(
        () => ({
          id: Math.random().toString(36).slice(2),
          x: window.innerWidth * (0.25 + Math.random() * 0.5),
          size: 1.5 + Math.random() * 3,
          yStart: 0,
        })
      );
      setParticles((prev) => [...prev.slice(-80), ...batch]);
    }, 120);

    return () => clearInterval(interval);
  }, [active, intensity]);

  return (
    <div className="particles">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="particle-dot"
          initial={{ opacity: 0.8, y: p.yStart, x: p.x }}
          animate={{
            opacity: [0.9, 0.5, 0],
            y: -120 - Math.random() * 100,
            x: p.x + (Math.random() - 0.5) * 120,
          }}
          transition={{
            duration: 1 + Math.random() * 0.8,
            ease: "easeOut",
          }}
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}
