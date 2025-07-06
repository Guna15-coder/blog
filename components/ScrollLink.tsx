"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollLinked() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          originX: 0,
          background: "linear-gradient(90deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
        }}
      />
      <Content />
    </>
  );
}

/**
 * ==============   Utils   ================
 */

function Content() {
  return (
    <div>
    </div>
  );
}
