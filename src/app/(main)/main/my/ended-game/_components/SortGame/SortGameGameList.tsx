"use client";

import { getMyEndedGameGroupListCall } from "@/(actions)/main/my-game";
import Card from "./Card";
import { useEndedGameFilterStore } from "@/store/Game/ended/EndedGameFilter.store";
import { getEndedGroupGameList } from "@choosetale/nestia-type/lib/functional/my_page/ended_game/group_game/index";
import React, { useEffect, useRef, useState } from "react";
import { useEndedGameOrderStore } from "@/store/Game/ended/EndedGameOrder";
import Step1EndingIntro from "./_BottomSheet/Step1EndingIntro";
import GameBottomSheet from "@/common/Game/DetailBottomSheet/GameBottomSheet";
import { GAME_LIST_LIMIT } from "@/lib/config";
import { useInView } from "react-intersection-observer";

export default function SortGameGameList() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<
    "step1" | "step2" | null
  >(null);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();
  const [gameList, setGameList] = useState<
    getEndedGroupGameList.Output["list"]["game"]
  >([]);
  const isInitialMount = useRef(true);

  const selectedGenres = useEndedGameFilterStore(
    (state) => state.selectedGenres
  );
  const selectedOrderKey = useEndedGameOrderStore(
    (state) => state.selectedOrderKey
  );

  const handleBottomSheet = (
    step: "step1" | "step2" | null,
    gameId: number | null
  ) => {
    setIsOpenBottomSheet(step);
    setSelectedGameId(gameId);
  };

  useEffect(() => {
    if (inView && !isLoading && gameList.length < totalCount) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isLoading, gameList.length, totalCount]);

  useEffect(() => {
    if (page !== 1 && gameList.length > (page - 1) * GAME_LIST_LIMIT) {
      return;
    }
    const fetchGameList = async () => {
      setIsLoading(true);
      try {
        const res = await getMyEndedGameGroupListCall({
          page: page,
          limit: GAME_LIST_LIMIT,
          order: selectedOrderKey,
          genre: selectedGenres.length > 0 ? selectedGenres : ["ALL"],
        });

        if (page === 1) {
          setGameList(res.list.game);
        } else {
          setGameList((prev) => [...prev, ...res.list.game]);
        }
        setTotalCount(res.count);
      } catch (error) {
        console.error("Failed to fetch game list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGameList();
  }, [selectedGenres, selectedOrderKey, page]);

  return (
    <div className="flex flex-row w-full  flex-1  flex-wrap gap-x-[8px] gap-y-[24px]">
      {gameList.map((game) => (
        <div
          key={game.id}
          className="flex
          w-[calc(50%-4px)]
            cardScreen1:w-[calc(33.33%-8px)]
            cardScreen2:w-[180px]
              max-w-[180px]

              "
          onClick={() => handleBottomSheet("step1", game.id)}
        >
          {isOpenBottomSheet === "step1" && selectedGameId === game.id && (
            <Step1EndingIntro
              handleClose={() => handleBottomSheet(null, null)}
              game={{
                title: game.title,
                genre: game.genre,
                thumbnail: { url: game.thumbnail.url ?? "" },
                producer: {
                  name: game.author.name,
                },
              }}
              totalEndingCount={game.totalEndingCount}
              endings={game.endings}
              handleStep={(step: string) => {
                if (step !== "step1" && step !== "step2" && step !== null)
                  return;
                handleBottomSheet(step, game.id);
              }}
            />
          )}
          {isOpenBottomSheet === "step2" && selectedGameId === game.id && (
            <GameBottomSheet
              gameId={game.id}
              handleClose={() => handleBottomSheet(null, null)}
            />
          )}

          <Card
            key={game.id}
            cardData={{
              id: game.id,
              image: game.thumbnail.url ?? "",
              title: game.title,
              category: game.genre,
              reachedEndingCount: game.endings.length,
              totalEndingCount: game.totalEndingCount,
            }}
            // enrich={{ players: 1 }}
            users={[]}
          />
        </div>
      ))}
      {!isLoading && <div id="load" ref={ref} className="h-[1px]" />}
    </div>
  );
}
