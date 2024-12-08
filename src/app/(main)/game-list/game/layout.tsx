"use client";

import React, { useRef, useState, useEffect } from "react";
import MoveTopButton from "./_components/MoveTopButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollTop);
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollTop);
    }
  }, [scrollRef.current?.scrollTop]);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex flex-col w-full h-full overflow-y-auto"
    >
      {scrollPosition > 700 && <MoveTopButton onClick={scrollToTop} />}
      {children}
    </div>
  );
}
