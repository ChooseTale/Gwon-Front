"use client";

import React from "react";
import { GameListEntity } from "../../_domain/game-list.entity";
import Card from "@/common/Game/Crad";

export default function CardList({ gameList }: { gameList: GameListEntity }) {
  return (
    <div className="flex flex-row gap-2 flex-wrap justify-between">
      {gameList.gameList.map((game) => {
        return (
          <div className="flex w-[calc(50%-4px)] mb-[24px]" key={game.game.id}>
            <Card
              cards={{
                id: game.game.id,
                image: game.game.thumbnail?.url ?? "",
                title: game.game.title,
                category: game.game.genre,
              }}
              enrich={{
                players: game.game.player.length,
              }}
              users={game.game.player.map((player) => {
                return {
                  id: player.userId,
                  imageUrl: player.profileImage.url,
                };
              })}
              clickCard={() => {}}
            />
          </div>
        );
      })}
    </div>
  );
}
