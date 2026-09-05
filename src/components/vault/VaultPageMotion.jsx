"use client";

import { motion } from "framer-motion";

export function VaultPageMotion({
  children,
  className = "",
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function VaultListMotion({
  children,
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.055,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function VaultItemMotion({
  children,
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 6,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      whileHover={{
        y: -1,
      }}
    >
      {children}
    </motion.div>
  );
}