"use client";

import Image from "next/image";
import React from "react";
import UserImage from "@/common/Game/Card/Image";
import { GenresKorean } from "@/common/Game/Genre";
import Svg from "@/common/Svg";

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
  return (
    <div className="flex flex-col w-[171px] h-[266px]">
      <div
        className="w-full h-full aspect-square bg-gray-900 rounded-[8px] overflow-hidden relative"
        onClick={() => clickCard(cards.id)}
      >
        <Image
          className="object-cover w-full h-full"
          src={cards.image}
          alt="game"
          width={100}
          height={100}
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
      </div>
      <div
        className="flex flex-row w-[68px] h-[21px]
      bg-gray-800 rounded-[4px]
        justify-center
        gap-[2px]
        mt-[8px]
      "
      >
        <div className="flex items-center justify-center">
          <Svg
            icon="taleGradientIcon"
            options={{
              size: { width: 11, height: 11 },
              viewBox: "0 0 11 11",
            }}
          />
        </div>
        <div
          className="flex  h-[20px] rounded-[8px]
           caption-md
            text-transparent bg-clip-text ending-gradiant
            items-center justify-center
          "
        >
          엔딩 2/4
        </div>
      </div>
    </div>
  );
}
