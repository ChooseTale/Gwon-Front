"use client";

import Svg from "@/common/Svg";

import React from "react";

interface PlayTopNavProps {
  gameTitle: string;
  handleBack: () => void;
}

export default function PlayTopNav({ gameTitle, handleBack }: PlayTopNavProps) {
  return (
    <div className="flex w-full bg-black relative h-[48px] justify-center items-center">
      <div className="absolute left-[20px]">
        <div className="flex  flex-row text-gray-500" onClick={handleBack}>
          <Svg
            icon="chevronLeftIcon"
            options={{ size: { width: 32, height: 32 }, color: "white" }}
          />
        </div>
      </div>
      <div className="title2-sb text-white headline-md">{gameTitle}</div>
    </div>
  );
}
