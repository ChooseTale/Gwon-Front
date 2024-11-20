"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export interface TypingTextProps {
  text: string;
  speed?: "slow" | "normal" | "fast";
  initialDelay?: number;
  fontSize?: "sm" | "md" | "lg";
  className?: string;
}

export default function TypingText({
  text,
  initialDelay = 0,
  speed = "normal",
  className = "",
}: TypingTextProps) {
  const [skip, setSkip] = useState(false);

  const typingSpeed = {
    slow: 0.1,
    normal: 0.05,
    fast: 0.02,
  };
  const currentSpeed = typingSpeed[speed];
  const currentDelay = initialDelay;

  return (
    <>
      {skip
        ? text
        : text.split("").map((char, index) => (
            <motion.span
              // eslint-disable-next-line react/no-array-index-key -- Using index as key because content has no unique identifier
              key={char + index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: skip ? 0 : currentDelay + index * currentSpeed,
                duration: 0.001,
              }}
              className={className}
              onClick={() => setSkip(true)}
              onTouchStart={() => setSkip(true)}
            >
              {char}
            </motion.span>
          ))}
    </>
  );
}
