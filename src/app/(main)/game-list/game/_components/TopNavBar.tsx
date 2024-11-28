"use client";
import Svg from "@/common/Svg";
import React from "react";

export default function TopNavBar() {
  return (
    <div className="">
      <div className="text-green-500 text-2xl font-bold mb-[16px]">
        ChooseTale
      </div>
      <div className="flex  w-full mb-[20px] justify-between items-center">
        <div className="flex flex-row justify-center items-center w-[92px] h-[38px] border border-grey-700 rounded-[8px]">
          <Svg
            icon="slidersIcon"
            options={{
              size: { width: 18, height: 18 },
              viewBox: "0 0 18 18",
              color: "white",
            }}
          />
          <span className="headline-md text-white ml-[6px]">장르</span>
        </div>
        <div className="flex flex-row justify-center items-center">
          <span className="body-rg text-white">최신순</span>
          <div className="flex flex-row w-[18px] h-[18px] justify-center items-center ">
            <Svg
              icon="chevronDownIcon"
              options={{
                size: { width: 9, height: 4.5 },
                viewBox: "6 10 12 6",
                color: "white",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
