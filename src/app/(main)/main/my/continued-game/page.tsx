"use client";

import React from "react";
import TopNavBar from "./_components/ContinuedTopNav";

import ContinuedGamesList from "./(page)/GameLIst";
import TopVar from "./_components/TopVar";
import MarginWrapper from "../../_component/MarginWrapper";

export default function ContinuedGame() {
  return (
    <MarginWrapper>
      <div className="flex flex-col w-full">
        <TopVar />
        <div className="mt-[16px]" />
        <TopNavBar />
        <div className="mt-6" />
        <ContinuedGamesList />
        <div className="mb-[60px]" />
      </div>
    </MarginWrapper>
  );
}
