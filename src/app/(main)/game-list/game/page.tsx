"use client";

import { getGameListCall } from "@/app/(actions)/main/game";
import React, { useEffect, useState } from "react";
import CardList from "./_components/CardList";
import { GameListEntity } from "../../_domain/game-list.entity";

export default function GameList() {
  const [gameList, setGameList] = useState<GameListEntity>(
    new GameListEntity([])
  );

  useEffect(() => {
    const getGameList = async () => {
      const res = await getGameListCall();
      console.log(res.map((game) => game.game.player));
      setGameList(new GameListEntity(res));
    };

    getGameList();
  }, []);

  return (
    <div className="flex">
      <CardList gameList={gameList} />
    </div>
  );
}
