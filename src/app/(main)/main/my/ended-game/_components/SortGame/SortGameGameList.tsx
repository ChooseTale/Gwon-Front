"use client";

import { getMyEndedGameGroupListCall } from "@/app/(actions)/main/my-game";
import Card from "./Card";
import { useEndedGameFilterStore } from "@/store/Game/ended/EndedGameFilter.store";
import { getEndedGroupGameList } from "@choosetale/nestia-type/lib/functional/my_page/ended_game/group_game/index";
import React, { useEffect, useState } from "react";
import { useEndedGameOrderStore } from "@/store/Game/ended/EndedGameOrder";
import Step1EndingIntro from "./_BottomSheet/Step1EndingIntro";
import GameBottomSheet from "@/common/Game/DetailBottomSheet/GameBottomSheet";

export default function SortGameGameList() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState<
    "step1" | "step2" | null
  >(null);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

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
    console.log(step, gameId);
    setIsOpenBottomSheet(step);
    setSelectedGameId(gameId);
  };

  const [gameList, setGameList] = useState<getEndedGroupGameList.Output>([]);
  useEffect(() => {
    const fetchGameList = async () => {
      const res = await getMyEndedGameGroupListCall({
        page: 1,
        limit: 10,
        order: selectedOrderKey,
        genre: selectedGenres.length > 0 ? selectedGenres : ["ALL"],
      });

      setGameList(res);
    };
    fetchGameList();
  }, [selectedGenres, selectedOrderKey]);

  return (
    <div className="flex flex-row flex-wrap gap-[8px]">
      {gameList.map((game) => (
        <div key={game.game.id}>
          {isOpenBottomSheet === "step1" && selectedGameId === game.game.id && (
            <Step1EndingIntro
              handleClose={() => handleBottomSheet(null, null)}
              game={{
                title: game.game.title,
                genre: game.game.genre,
                thumbnail: { url: game.game.thumbnail.url ?? "" },
                producer: {
                  name: "여기 작업해야함",
                },
              }}
              totalEndingCount={game.game.totalEndingCount}
              endings={game.game.endings}
              handleStep={(step: string) => {
                if (step !== "step1" && step !== "step2" && step !== null)
                  return;
                handleBottomSheet(step, game.game.id);
              }}
            />
          )}
          {isOpenBottomSheet === "step2" && selectedGameId === game.game.id && (
            <GameBottomSheet
              gameId={game.game.id}
              handleClose={() => handleBottomSheet(null, null)}
            />
          )}
          <div
            key={game.game.id}
            onClick={() => handleBottomSheet("step1", game.game.id)}
          >
            <Card
              key={game.game.id}
              cardData={{
                id: game.game.id,
                image: game.game.thumbnail.url ?? "",
                title: game.game.title,
                category: game.game.genre,
              }}
              enrich={{ players: 1 }}
              users={[]}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
