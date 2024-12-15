"use client";

import React, { useState } from "react";
import EndedGameTopNav from "./_components/EndedGameTopNav";
import SelectSortNav from "./_components/SelectSortNav";

import SortGameGameList from "./_components/SortGame/SortGameGameList";
import TopNavBar from "./_components/TopNavBar";

export default function EndedGamePage() {
  return (
    <div>
      <EndedGameTopNav />

      <TopNavBar />

      <SortGameGameList />
    </div>
  );
}
