"use server";

import React from "react";
import GameList from "./(client)/GameLIst";
import RowCardListStatic from "@/common/Game/StaticRowCardList";
import TopNavBar from "./_components/TopNavBar";

export default async function GamePage() {
  return (
    <div className="flex flex-col ">
      <div className="flex text-green-500 text-2xl font-bold mb-[16px]">
        ChooseTale
      </div>
      <RowCardListStatic
        title="이번주 Top 10 👑"
        gameFilterOptions={{ genres: [] }}
      />
      <div className="min-h-[12px]  h-[12px] bg-gray-900  mt-[40px] mb-[40px] " />
      <TopNavBar />

      <GameList />
    </div>
  );
}
