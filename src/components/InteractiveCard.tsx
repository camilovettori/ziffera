"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function InteractiveCard({ children }: any) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 25;
    const rotateY = (x - centerX) / 25;

    setRotate({ x: rotateX, y: rotateY });

    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setRotate({ x: 0, y: 0 });
        setGlow({ x: 50, y: 50 });
      }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {/* GLOW FOLLOW */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2.4rem] opacity-40 blur-2xl transition duration-300"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.35), transparent 40%)`,
        }}
      />

      {children}
    </motion.div>
  );
}