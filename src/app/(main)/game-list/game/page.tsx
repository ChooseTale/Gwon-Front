"use server";

import React from "react";
import GameList from "./(client)/GameLIst";
import RowCardListStatic from "@/common/Game/StaticRowCardList";

export default async function GamePage() {
  return (
    <div className="flex flex-col">
      <RowCardListStatic
        title="이번주 Top 10 👑"
        gameFilterOptions={{ genres: [] }}
      />
      <div className="w-[100vw] h-[12px] bg-gray-900  mt-[40px] mb-[40px] ml-[-20px]" />
      <GameList />
    </div>
  );
}
