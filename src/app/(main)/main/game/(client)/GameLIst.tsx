"use client";

import { getGameListCall } from "@/(actions)/main/game";
import React, { useEffect, useState } from "react";
import CardList from "../_components/CardList";
import { GameListEntity } from "../../../_domain/game-list.entity";
import { useGameFilterStore } from "@/store/Game/GameFilter.store";
import { useGameOrderStore } from "@/store/Game/GameOrder.store";

export default function GameList() {
  const [gameList, setGameList] = useState<GameListEntity>(
    new GameListEntity([])
  );

  const selectedGenres = useGameFilterStore((state) => state.selectedGenres);
  const selectedOrder = useGameOrderStore((state) => state.selectedOrder);

  useEffect(() => {
    const getGameList = async () => {
      const res = await getGameListCall({
        genres: selectedGenres,
        order: selectedOrder,
      });
      setGameList(new GameListEntity(res));
    };

    getGameList();
  }, [selectedGenres, selectedOrder]);

  return (
    <div className="flex flex-col h-full">
      <CardList gameList={gameList} />
    </div>
  );
}
