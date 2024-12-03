import Svg from "@/common/Svg";
import Image from "next/image";
import React from "react";

export default function ContinuedGamesCard() {
  return (
    <div className="w-full h-full flex flex-col">
      <Image
        className="w-full h-full object-cover rounded-[8px]"
        src={
          "https://img.sbs.co.kr/newsnet/etv/upload/2024/04/25/30000922260_1280.jpg"
        }
        alt="game"
        width={100}
        height={100}
      />
      <div className="flex flex-col mt-[8px]">
        <span className="caption-rg text-gray-100">2024.10.04</span>
        <div className="headline-md text-white">전지적 독자시점</div>
        <div className="flex flex-row items-center">
          <div className="caption-rg text-green-500">최강의 희생양 (2)</div>
          <Svg
            icon="chevronRightIcon"
            options={{ size: { width: 20, height: 20 }, color: "green-500" }}
          />
        </div>
      </div>
    </div>
  );
}
