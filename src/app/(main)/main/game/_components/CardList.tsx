"use client";

import React from "react";
import { GameListEntity } from "../../../_domain/game-list.entity";
import Card from "@/common/Game/Card";

export default function CardList({ gameList }: { gameList: GameListEntity }) {
  return (
    <div className="flex w-full h-full flex-row gap-2 flex-wrap justify-start">
      {gameList.gameList.map((game) => {
        return (
          <div
            className={`flex mb-[24px]
            w-[calc(50%-4px)]
            cardScreen1:w-[calc(33.33%-8px)]
            cardScreen2:w-[180px]
              max-w-[180px]
            `}
            key={game.game.id}
          >
            <Card
              cardData={{
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
