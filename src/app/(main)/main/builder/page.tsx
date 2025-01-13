"use client";

import React, { useEffect, useState } from "react";
import NewGameButton from "./_components/NewGameButton";
import BuilderTopNav from "./_components/TopNav";
import GenreTopBar from "./_components/GenreTopBar";
import GameCard from "./_components/GmaeCard";
import { useBuilderGameFilterStore } from "@/store/Game/builder/building/BuildingGameFilter.store";
import { useBuilderGameOrderStore } from "@/store/Game/builder/building/BuildingGameOrder.store";
import { getMyBuildedGames } from "@choosetale/nestia-type/lib/functional/my_page/game_builder/index";
import { GenresKorean } from "@/common/Game/Genre";
import { getBuildingGamesCall } from "@/app/(actions)/main/builder/game";
import PublishedGameCard from "./_components/PublishedGameCard";

export default function BuilderPage() {
  const [games, setGames] = useState<getMyBuildedGames.Output>({ games: [] });

  const filter = useBuilderGameFilterStore((state) => state.selectedGenres);
  const order = useBuilderGameOrderStore((state) => state.selectedOrder);

  const [gameStatus, setGameStatus] = useState<"BUILDING" | "PUBLISHED">(
    "BUILDING"
  );

  const handleStatusChange = (status: "BUILDING" | "PUBLISHED") => {
    setGameStatus(status);
  };

  useEffect(() => {
    const getGames = async () => {
      const games = await getBuildingGamesCall({
        genre: filter,
        order,
        status: gameStatus,
      });
      setGames(games);
    };
    getGames();
  }, [gameStatus, filter, order]);

  return (
    <>
      <div className="w-full h-fit">
        <BuilderTopNav
          status={gameStatus as "BUILDING" | "PUBLISHED"}
          handleStatusChange={handleStatusChange}
        />
        <div className="mt-[20px]" />
        {/* 장르 탑바 */}
        <GenreTopBar />
        <div className="flex flex-col gap-3 mb-[88px]">
          {games.games.map((game: getMyBuildedGames.Output["games"][0]) => {
            if (gameStatus === "BUILDING") {
              return (
                <GameCard
                  key={game.id}
                  id={game.id}
                  genre={game.genre as keyof typeof GenresKorean}
                  title={game.title}
                  description={game.description}
                  updatedAt={new Date()}
                  thumbnail={{
                    url: game.thumbnail.url,
                  }}
                  counts={{
                    ending: game.count.endingCount,
                    pages: game.count.pageCount,
                    choices: game.count.choiceCount,
                  }}
                />
              );
            }
            if (gameStatus === "PUBLISHED") {
              return (
                <PublishedGameCard
                  key={game.id}
                  genre={game.genre as keyof typeof GenresKorean}
                  title={game.title}
                  description={game.description}
                  updatedAt={new Date()}
                  thumbnail={{
                    url: game.thumbnail.url,
                  }}
                  counts={{
                    ending: game.count.endingCount,
                    pages: game.count.pageCount,
                    choices: game.count.choiceCount,
                  }}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="relative h-full w-full flex flex-col items-center justify-center">
        <NewGameButton />
      </div>
    </>
  );
}
