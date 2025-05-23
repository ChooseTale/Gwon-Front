"use client";

import { convertDate } from "@/app/(utils)/convert-date";
import GameBottomSheet from "@/common/Game/DetailBottomSheet/GameBottomSheet";
import { useCommonStore } from "@/store/common.store";

import Image from "next/image";
import React, { useState } from "react";

export default function ContinuedGamesCard({ game }: { game: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    useCommonStore.getState().setIsModalOrBottomSheetOpen(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <GameBottomSheet gameId={game.game.id} handleClose={handleClose} />
      )}
      <div className="w-full  h-full   flex flex-col" onClick={handleClick}>
        <>
          <Image
            className="w-full  aspect-square object-cover rounded-[8px]"
            src={game.game.thumbnail.url ?? ""}
            alt="game"
            layout="responsive"
            width={100}
            height={100}
          />
        </>

        <div className="flex  flex-col mt-[8px]">
          <span className="caption-rg text-gray-100 mt-[8px]">
            {convertDate(game.play.createdAt)}
          </span>
          <div className="headline-md text-white mt-[2px] line-clamp-1">
            {game.game.title}
          </div>
          <div className="flex flex-row items-center mt-[2px]">
            <div className="caption-rg text-green-500 line-clamp-1 mt-[2px]">
              {game.play.page.title}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
