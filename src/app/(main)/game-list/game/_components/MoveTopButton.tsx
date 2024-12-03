"use client";

import Svg from "@/common/Svg";
import React, { useState, useEffect } from "react";

export default function MoveTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="z-30 fixed bottom-12 right-12
          bg-gray-700  rounded-full w-[48px] h-[48px]
          focus:outline-none transition-opacity duration-300 ease-in-out"
        >
          <Svg
            icon="chevronUpIcon"
            options={{ size: { width: 30, height: 30 }, color: "white" }}
          />
        </button>
      )}
    </div>
  );
}
