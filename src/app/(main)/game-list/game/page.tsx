"use client";

import { getGameListCall } from "@/app/(actions)/main/game";
import React, { useEffect, useState } from "react";
import CardList from "./_components/CardList";
import { GameListEntity } from "../../_domain/game-list.entity";
import { useGameFilterStore } from "@/store/Game/GameFilter.store";

export default function GameList() {
  const [gameList, setGameList] = useState<GameListEntity>(
    new GameListEntity([])
  );
  const selectedGenres = useGameFilterStore((state) => state.selectedGenres);

  useEffect(() => {
    const getGameList = async () => {
      const res = await getGameListCall({ genres: selectedGenres });
      setGameList(new GameListEntity(res));
    };

    getGameList();
  }, [selectedGenres]);

  return (
    <div className="flex ">
      <CardList gameList={gameList} />
    </div>
  );
}
