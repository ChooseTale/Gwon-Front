"use client";

import { convertDate } from "@/app/(utils)/convert-date";
import { GenresKorean } from "@/common/Game/Genre";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface GameCardProps {
  id: number;
  genre: keyof typeof GenresKorean;
  title: string;
  description: string;
  updatedAt: Date;
  thumbnail: {
    url: string | null;
  };
  counts: {
    ending: number;
    pages: number;
    choices: number;
  };
}

export default function GmaeCard(game: GameCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/builder/game/${game.id}`);
  };

  return (
    <div
      className="w-full h-[170px] rounded-[8px] border border-gray-700"
      onClick={handleClick}
    >
      {/* 장르, 수정 날짜 */}
      <div className="flex flex-row  justify-between items-center ml-4 mr-4 mt-4">
        <div className="caption-rg text-white">{GenresKorean[game.genre]}</div>
        <div className="caption-rg text-gray-600">
          {convertDate(game.updatedAt.toString())} 수정
        </div>
      </div>
      {/* 본문 */}
      <div className="ml-4 mr-4 mt-[7px] flex flex-row h-[113px] ">
        {/* 썸네일 */}
        <div
          className="flex w-[120px] aspect-square
          rounded-[8px]
          overflow-hidden
        "
        >
          <div className="relative  w-[97px] h-[97px]">
            <Image
              className="object-cover rounded-[5px] "
              src={
                game.thumbnail.url ||
                "https://img.sbs.co.kr/newsnet/etv/upload/2024/04/25/30000922260_1280.jpg"
              }
              alt="thumbnail"
              fill
              objectFit="cover"
            />
          </div>
        </div>
        {/* 제목, 설명, 카운트 */}
        <div className="flex flex-col flex-1 ">
          <div className=" headline-sb h-[44px] text-white text-ellipsis line-clamp-2">
            {game.title}
          </div>
          <div className="mt-1 body-rg text-gray-600 text-ellipsis line-clamp-2">
            {game.description}
          </div>
          <div className="flex flex-row items-center mt-2">
            <div className="flex caption-rg text-end text-green-500">
              엔딩 {game.counts.ending}개
            </div>
            <div className="ml-1 mr-1 w-[1px] h-[10px] bg-gray-600 "></div>
            <div className="flex  caption-rg text-green-500">
              선택지 {game.counts.pages}개
            </div>
            <div className="ml-1 mr-1 w-[1px] h-[10px] bg-gray-600 "></div>
            <div className="flex  caption-rg text-green-500">
              페이지 {game.counts.choices}개
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
