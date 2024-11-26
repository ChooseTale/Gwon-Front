"use client";

import Image from "next/image";
import React from "react";
import UserImage from "./Card/Image";

type CardProps = {
  cards: {
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

export default function Crad({ cards, enrich, users, clickCard }: CardProps) {
  return (
    <div className="flex flex-col w-[10rem]">
      <div
        className="w-[10rem] h-[10rem] bg-grey-900 rounded-[8px] overflow-hidden relative"
        onClick={() => clickCard(cards.id)}
      >
        <Image src={cards.image} alt="game" layout="fill" objectFit="cover" />
      </div>
      <span className="text-white headline-md mt-[8px]">{cards.title}</span>
      <span className="caption-rg text-grey-200">{cards.category}</span>
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
