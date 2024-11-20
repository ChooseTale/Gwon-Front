"use client";
import { motion } from "framer-motion";

export interface TypingTextWithCursorProps {
  text: string;
  speed?: "slow" | "normal" | "fast";
  initialDelay?: number;
  hasTypingCursor?: boolean;
  fontSize?: "sm" | "md" | "lg";
  className?: string;
}

export default function TypingTextWithCursor({
  text,
  initialDelay = 0,
  speed = "normal",
  hasTypingCursor = true,
  fontSize = "md",
  className = "",
}: TypingTextWithCursorProps) {
  const typingSpeed = {
    slow: 0.1,
    normal: 0.05,
    fast: 0.02,
  };
  const currentSpeed = typingSpeed[speed];
  const currentDelay =
    hasTypingCursor && initialDelay === 0 ? initialDelay + 1 : initialDelay;

  return (
    <div className={`relative inline-block text-${fontSize} ${className}`}>
      {hasTypingCursor && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            delay: initialDelay,
            duration: 0.1,
          }}
        >
          <motion.div
            className="typing-cursor absolute top-6 left-0 w-3 h-[2px] mt-auto mb-1 bg-black"
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.25,
              repeatDelay: 0.25,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      )}

      {text.split("").map((char, index) => (
        <motion.span
          // eslint-disable-next-line react/no-array-index-key -- Using index as key because content has no unique identifier
          key={char + index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: currentDelay + index * currentSpeed,
            duration: 0.001,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
