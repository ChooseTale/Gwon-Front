"use client";

import Image from "next/image";
import React, { useState } from "react";
import UserImage from "./Card/Image";
import { GenresKorean } from "./Genre";
import GameBottomSheet from "./DetailBottomSheet/GameBottomSheet";

type CardProps = {
  cardData: {
    id: number;
    image: string;
    title: string;
    category: string;
  };
  enrich: {
    players: number;
  };
  users: {
    id: number;
    imageUrl: string;
  }[];
  clickCard: (cardId: number) => void;
};

export default function Card({
  cardData: cards,
  enrich,
  users,
  clickCard,
}: CardProps) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClickCard = () => {
    setIsClicked(true);
    clickCard(cards.id);
  };

  const handleCloseBottomSheet = () => {
    setIsClicked(false);
  };
  return (
    <div className="flex w-full flex-col flex-1 flex-shrink-0">
      {isClicked && (
        <GameBottomSheet
          gameId={cards.id}
          handleClose={handleCloseBottomSheet}
        />
      )}
      <div
        className="w-full h-full aspect-square bg-gray-900 rounded-[8px] overflow-hidden relative"
        onClick={handleClickCard}
      >
        <Image
          className="object-cover w-full h-full"
          src={cards.image}
          alt="game"
          fill
        />
      </div>
      <span className="text-white headline-md mt-[8px]">{cards.title}</span>
      <span className="caption-rg text-gray-200">
        {GenresKorean[cards.category as keyof typeof GenresKorean]}
      </span>
      <div className="flex flex-row ">
        <div className="flex flex-row w-[2rem] -space-x-2">
          {users.reduce((prev, curr, idx) => {
            if (idx > 2) {
              return prev;
            }
            return [...prev, <UserImage key={curr.id} src={curr.imageUrl} />];
          }, [] as React.ReactNode[])}
        </div>
        <span className="ml-[4px] caption-rg text-white">
          {enrich.players}명이 플레이 했어요
        </span>
      </div>
    </div>
  );
}
