"use client";

import React, { useEffect, useState } from "react";
import ContinuedGamesCard from "../../_components/ContinuedGames/Card";
import { getContinuedGameList } from "@choosetale/nestia-type/lib/functional/my_page/continued_game";
import { getMyContinuedGameListCall } from "@/(actions)/main/my-game";
import { useContinuedGameFilterStore } from "@/store/Game/continued/ContinuedGameFilter.store";
import { useContinuedGameOrderStore } from "@/store/Game/continued/ContinuedGameOrder.store";

export default function ContinuedGamesList() {
  const [continuedGameList, setContinuedGameList] =
    useState<getContinuedGameList.Output>([]);

  const selectedGenres = useContinuedGameFilterStore(
    (state) => state.selectedGenres
  );
  const selectedOrder = useContinuedGameOrderStore(
    (state) => state.selectedOrder
  );

  useEffect(() => {
    const getMyContinuedGameList = async () => {
      const res = await getMyContinuedGameListCall({
        page: 1,
        limit: 8,
        order: selectedOrder,
        genre: selectedGenres.length > 0 ? selectedGenres : ["ALL"],
      });
      setContinuedGameList(res);
    };

    getMyContinuedGameList();
  }, [selectedGenres, selectedOrder]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row  flex-wrap gap-2     mt-[12px]">
        {continuedGameList.map((game) => (
          <div
            className="flex  w-[calc(50%-4px)]
            cardScreen1:w-[calc(33.33%-8px)]
            cardScreen2:w-[180px]
              max-w-[180px] "
            key={game.game.id.toString()}
          >
            <ContinuedGamesCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}
