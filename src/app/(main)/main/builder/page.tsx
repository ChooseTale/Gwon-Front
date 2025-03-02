"use client";

import React, { useEffect, useRef, useState } from "react";
import NewGameButton from "./_components/NewGameButton";
import BuilderTopNav from "./_components/TopNav";
import GenreTopBar from "./_components/GenreTopBar";
import GameCard from "./_components/GmaeCard";
import { useBuilderGameFilterStore } from "@/store/Game/builder/building/BuildingGameFilter.store";
import { useBuilderGameOrderStore } from "@/store/Game/builder/building/BuildingGameOrder.store";
import { getMyBuildedGames } from "@choosetale/nestia-type/lib/functional/my_page/game_builder/index";
import { GenresKorean } from "@/common/Game/Genre";
import { getBuildingGamesCall } from "@/(actions)/main/builder/game";
import PublishedGameCard from "./_components/PublishedGameCard";
import { useInView } from "react-intersection-observer";
import { GAME_LIST_LIMIT } from "@/lib/config";

export default function BuilderPage() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();
  const [totalCount, setTotalCount] = useState(0);
  const isInitialMount = useRef(true);

  const [games, setGames] = useState<getMyBuildedGames.Output["games"]>([]);

  const filter = useBuilderGameFilterStore((state) => state.selectedGenres);
  const order = useBuilderGameOrderStore((state) => state.selectedOrder);

  const [gameStatus, setGameStatus] = useState<"BUILDING" | "PUBLISHED">(
    "BUILDING"
  );

  const handleStatusChange = (status: "BUILDING" | "PUBLISHED") => {
    setGameStatus(status);
    setPage(1);
    setGames([]);
  };

  useEffect(() => {
    if (inView && !isLoading && games.length < totalCount) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isLoading, totalCount]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setPage(1);
    setGames([]);
  }, [gameStatus, filter, order, gameStatus]);

  useEffect(() => {
    if (page === 1 && games.length !== 0) {
      return;
    }

    if (page !== 1 && games.length > (page - 1) * GAME_LIST_LIMIT) {
      return;
    }

    const getGames = async () => {
      setIsLoading(true);
      const games = await getBuildingGamesCall({
        genre: filter,
        order,
        status: gameStatus,
        page,
        limit: GAME_LIST_LIMIT,
      });
      if (page === 1) {
        setGames(games.games);
      } else {
        setGames((prev) => [...prev, ...games.games]);
      }
      setTotalCount(games.count);
      setIsLoading(false);
    };
    getGames();
  }, [gameStatus, filter, order, page]);

  return (
    <>
      <div className="w-full h-fit">
        <BuilderTopNav
          status={gameStatus as "BUILDING" | "PUBLISHED"}
          handleStatusChange={handleStatusChange}
        />
        <div className="mt-[20px]" />
        {/* 장르 탑바 */}
        <GenreTopBar isSelected={filter.length > 0} />
        {games.length === 0 && (
          <div className="flex flex-col   items-center justify-center h-full">
            <div className="text-headline-md text-gray-400">
              현재 {gameStatus === "BUILDING" ? "제작한 " : "게시한 "}게임이
              없어요. <br />
              {gameStatus === "BUILDING"
                ? "게임을 제작해볼까요?"
                : "게임을 게시해보세요!"}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 mb-[88px]">
          {games.map((game: getMyBuildedGames.Output["games"][0]) => {
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
      {!isLoading && <div id="load" ref={ref} className="h-[1px]" />}
      <div className="relative h-full w-full flex flex-col items-center justify-center">
        <NewGameButton />
      </div>
    </>
  );
}
