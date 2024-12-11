"use client";

import React from "react";

interface ButtonProps {
  value: string;
  onClick: () => void;
}

export default function Button({ value, onClick }: ButtonProps) {
  return (
    <div
      className="flex w-full h-[52px]
          bg-green-500 rounded-[8px]
      justify-center items-center title2-md"
      onClick={onClick}
    >
      {value}
    </div>
  );
}
