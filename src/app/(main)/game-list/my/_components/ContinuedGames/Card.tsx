import Svg from "@/common/Svg";
import { GetContinuedGameListResDto } from "@choosetale/nestia-type/lib/structures/GetContinuedGameListResDto";
import Image from "next/image";
import React from "react";

export default function ContinuedGamesCard({
  game,
}: {
  game: GetContinuedGameListResDto;
}) {
  return (
    <div className="w-full h-full aspect-square flex flex-col">
      <Image
        className="w-full h-full object-cover rounded-[8px]"
        src={game.game.thumbnail.url}
        alt="game"
        width={100}
        height={100}
      />
      <div className="flex flex-col mt-[8px]">
        <span className="caption-rg text-gray-100">{game.play.createdAt}</span>
        <div className="headline-md text-white">{game.game.title}</div>
        <div className="flex flex-row items-center">
          <div className="caption-rg text-green-500">
            {game.play.page.abridgement}
          </div>
          <Svg
            icon="chevronRightIcon"
            options={{ size: { width: 20, height: 20 }, color: "green-500" }}
          />
        </div>
      </div>
    </div>
  );
}
