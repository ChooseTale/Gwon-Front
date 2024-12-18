"use client";

import React from "react";

interface ButtonProps {
  bgColor?: string;
  textColor?: string;
  value: string;
  onClick: () => void;
}

export default function Button({
  value,
  onClick,
  bgColor,
  textColor,
}: ButtonProps) {
  return (
    <div
      className={`flex w-full h-[52px]
          ${bgColor ? bgColor : "bg-green-500"} rounded-[8px]
      justify-center items-center title2-md ${
        textColor ? textColor : "text-black"
      }`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}
