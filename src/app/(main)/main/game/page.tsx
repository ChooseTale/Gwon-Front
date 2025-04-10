"use server";

import React from "react";
import GameList from "./(client)/GameLIst";
import RowCardListStatic from "@/common/Game/StaticRowCardList";
import TopNavBar from "./_components/TopNavBar";
import MarginWrapper from "../_component/MarginWrapper";
import W600Wrapper from "../_component/W600Wrapper";

export default async function GamePage() {
  console.log("렌더링");
  return (
    <div className="flex flex-col w-full items-center">
      <MarginWrapper>
        <div className="flex w-full justify-start items-start text-green-500 text-2xl font-bold mb-[16px]">
          ChooseTale
        </div>
      </MarginWrapper>

      <W600Wrapper>
        <RowCardListStatic
          title="이번주 Top 10 👑"
          gameFilterOptions={{ genres: [] }}
        />
      </W600Wrapper>

      <div className="min-h-[12px] w-full  h-[12px] bg-gray-900  mt-[40px] mb-[40px] " />
      <MarginWrapper>
        <TopNavBar />

        <GameList />
        <div className="mb-[60px]" />
      </MarginWrapper>
    </div>
  );
}
