"use client";

import React from "react";
import TopNavBar from "./_components/ContinuedTopNav";

import ContinuedGamesList from "./(page)/GameLIst";
import TopVar from "./_components/TopVar";

export default function ContinuedGame() {
  return (
    <div>
      <TopVar />
      <div className="mt-[16px]" />
      <TopNavBar />
      <div className="mt-6" />
      <ContinuedGamesList />
    </div>
  );
}
