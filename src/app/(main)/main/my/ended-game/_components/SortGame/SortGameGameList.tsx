"use client";

import { getMyEndedGameGroupListCall } from "@/app/(actions)/main/my-game";
import Card from "./Card";
import { useEndedGameFilterStore } from "@/store/Game/ended/EndedGameFilter.store";
import { getEndedGroupGameList } from "@choosetale/nestia-type/lib/functional/my_page/ended_game/group_game/index";
import React, { useEffect, useState } from "react";
import { useEndedGameOrderStore } from "@/store/Game/ended/EndedGameOrder";

export default function SortGameGameList() {
  const selectedGenres = useEndedGameFilterStore(
    (state) => state.selectedGenres
  );
  const selectedOrderKey = useEndedGameOrderStore(
    (state) => state.selectedOrderKey
  );

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
          clickCard={() => {}}
        />
      ))}
    </div>
  );
}
