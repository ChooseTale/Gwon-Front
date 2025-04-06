"use client";

import React from "react";
import EndedGameTopNav from "./_components/EndedGameTopNav";

import SortGameGameList from "./_components/SortGame/SortGameGameList";
import TopNavBar from "./_components/TopNavBar";
import MarginWrapper from "../../_component/MarginWrapper";

export default function EndedGamePage() {
  return (
    <div>
      <MarginWrapper>
        <div className="flex flex-col w-full">
          <EndedGameTopNav />
          <TopNavBar />
          <div className="mt-[24px]" />
          <SortGameGameList />
          <div className="mb-[60px]" />
        </div>
      </MarginWrapper>
    </div>
  );
}
