"use client";

import { GameListEntity } from "@/app/(main)/_domain/game-list.entity";
import React from "react";
import Card from "../Card";
import { getList } from "@choosetale/nestia-type/lib/functional/game_play/list";

export default function RowCardList({
  title,
  cards,
}: {
  title: string;
  cards: getList.Output;
}) {
  const gameListEntity = new GameListEntity(cards);

  return (
    <div>
      <span className="title2-sb text-white">{title}</span>
      <div className="flex overflow-x-auto gap-2 flex-nowrap  h-[266px] mt-4">
        {gameListEntity.gameList.map((card) => {
          return (
            <div className="flex w-[171px]" key={card.game.id}>
              <Card
                cardData={{
                  id: card.game.id,
                  image: card.game.thumbnail?.url ?? "",
                  title: card.game.title,
                  category: card.game.genre,
                }}
                enrich={{
                  players: card.game.player.length,
                }}
                users={card.game.player.map((player) => ({
                  id: player.userId,
                  imageUrl: player.profileImage.url,
                }))}
                clickCard={() => {}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}