"use client";

import Svg from "@/common/Svg";
import React from "react";
import ContinuedGamesCard from "./ContinuedGames/Card";

export default function ContinuedGames() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="title2-sb text-white">진행중인 게임</div>
        <div className="flex  flex-row text-gray-500">
          <span className="body1-sb">전체보기</span>
          <Svg
            icon="chevronRightIcon"
            options={{ size: { width: 24, height: 24 }, color: "gray-500" }}
          />
        </div>
      </div>
      <div className="flex flex-row h-[244px] gap-2 flex-nowrap overflow-x-auto mt-[12px]">
        <div className="flex w-[170px] bg-red-500 h-[173px] ">
          <ContinuedGamesCard />
        </div>

        <div className="flex w-[170px] h-[173px] ">
          <ContinuedGamesCard />
        </div>
        <div className="flex w-[170px] h-[173px] ">
          <ContinuedGamesCard />
        </div>
      </div>
    </div>
  );
}
