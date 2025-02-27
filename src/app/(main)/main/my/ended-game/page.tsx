"use client";

import React from "react";
import EndedGameTopNav from "./_components/EndedGameTopNav";

import SortGameGameList from "./_components/SortGame/SortGameGameList";
import TopNavBar from "./_components/TopNavBar";

export default function EndedGamePage() {
  return (
    <div>
      <EndedGameTopNav />
      <TopNavBar />
      <div className="mt-[24px]" />
      <SortGameGameList />
    </div>
  );
}
