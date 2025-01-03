"use client";

import React from "react";
import NewGameButton from "./_components/NewGameButton";
import BuilderTopNav from "./_components/TopNav";
import GenreTopBar from "./_components/GenreTopBar";
import GameCard from "./_components/GmaeCard";

export default function page() {
  return (
    <>
      <div className="w-full h-full">
        <BuilderTopNav />
        <GenreTopBar />
        <GameCard
          genre="FANTASY"
          title="최대 30자까지 고려하고 있습니다: 이이상은 불가합니다"
          description="민수는 공동체와 협력해 대피소를 강화하고, 점차 도시를 민수는 공동체와 협력해 대피소를 강화하고, 점차 도시를"
          updatedAt={new Date()}
          thumbnail={{
            url: "https://img.sbs.co.kr/newsnet/etv/upload/2024/04/25/30000922260_1280.jpg",
          }}
          counts={{ ending: 0, choices: 0, pages: 0 }}
        />
      </div>
      <div className="relative h-full flex flex-col items-center justify-center">
        <NewGameButton />
      </div>
    </>
  );
}
