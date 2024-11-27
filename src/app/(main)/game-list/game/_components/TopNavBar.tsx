"use client";
import Svg from "@/common/Svg";
import React from "react";

export default function TopNavBar() {
  return (
    <>
      <div className="sf">ChooseTale</div>
      <div className="flex flex-row justify-center items-center w-[92px] h-[38px] border border-grey-700 rounded-[8px]">
        <Svg
          icon="slidersIcon"
          options={{
            size: { width: 18, height: 18 },
            viewBox: "0 0 18 18",
            color: "white",
          }}
        />
        <span className="headline-md text-white">장르</span>
      </div>
    </>
  );
}
