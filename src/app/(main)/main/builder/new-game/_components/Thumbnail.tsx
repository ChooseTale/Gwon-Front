"use client";

import Svg from "@/common/Svg";
import React from "react";

export default function Thumbnail() {
  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="headline-sb text-white">썸네일</div>
      </div>
      <div className="flex mt-[12px] h-[75px] border border-gray-600 rounded-[8px]">
        <div className="flex flex-1 flex-col justify-center items-center">
          <Svg
            icon="imageIcon"
            options={{
              size: { width: 24, height: 24 },

              color: "white",
            }}
          />
          <div className="body-md text-white mt-[2px]">사진추가</div>
        </div>
        <div className="bg-gray-600 w-[1px]"></div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <Svg
            icon="generateBIcon"
            options={{
              size: { width: 24, height: 24 },
              color: "white",
              fillColor: "white",
            }}
          />
          <div className="body-md text-white mt-[2px]">AI 생성</div>
        </div>
      </div>
    </div>
  );
}
