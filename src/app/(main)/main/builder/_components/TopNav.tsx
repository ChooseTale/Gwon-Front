"use client";

import React from "react";

export default function BuilderTopNav() {
  return (
    <div className="relative flex items-center justify-center h-[48px]">
      <div className="absolute h-full flex items-center left-0 cursor-pointer"></div>
      <span className="ml-2 text-white flex items-center">빌더</span>
    </div>
  );
}
