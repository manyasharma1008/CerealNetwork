import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles from "./Particles";
export default function TearTitle({ text = "Welcome to The Cereal <br /> Network" }) {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight * 0.8;
      const p = Math.max(0, Math.min(y / h, 1));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const lines = text.split("<br />");


  return (
    <div className="tear-title">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="tear-row">
          {line.split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className="tear-letter"
              style={{
                marginRight: ch === " " ? "10px" : "0px",
                textShadow: `0 0 ${10 - progress * 7}px rgba(0, 225, 255, ${
                  0.9 - progress * 0.8
                })`,
                filter: `blur(${progress * 2.5}px)`,
              }}
              animate={{
                y: progress * (i % 2 === 0 ? -100 : 100),
                rotate: progress * (i % 2 === 0 ? -15 : 15),
                opacity: 1 - progress * 1.2,
                scale: 1 - progress * 0.15,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
                duration: 0.1,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      ))}

      {/* Particle layer */}
      <Particles active={progress > 0.1 && progress < 1} intensity={progress} />
    </div>
  );
}
