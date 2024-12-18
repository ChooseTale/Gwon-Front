"use client";

import { getIntroScreen } from "@choosetale/nestia-type/lib/functional/game_play/intro/index";
import Button from "@/common/Button";
import Svg from "@/common/Svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GenresKorean } from "../Genre";
import { getIntroScreenCall } from "@/app/(actions)/main/play-game/intro";
import { useCommonStore } from "@/store/common.store";

type GameBottomSheetProps = {
  gameId: number;
  handleClose: () => void;
};

export default function GameBottomSheet({
  gameId,
  handleClose,
}: GameBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState<getIntroScreen.Output>();

  useEffect(() => {
    const getGame = async () => {
      const res = await getIntroScreenCall({ gameId });

      setGame(res);
    };
    getGame();
  }, [gameId]);

  useEffect(() => {
    useCommonStore.getState().setIsModalOrBottomSheetOpen(true);
    new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
      setIsOpen(true);
    });
  }, []);

  if (!game) return null;
  return (
    <div
      className="fixed flex inset-0  justify-center items-center bg-black bg-opacity-50 z-10"
      onClick={() => {
        useCommonStore.getState().setIsModalOrBottomSheetOpen(false);
        handleClose();
      }}
    >
      <div className="flex  w-full h-full  flex-col justify-center items-center relative">
        <div
          className={`flex flex-col absolute w-full min-w-[320px] max-w-[400px]
            h-[calc(100%-60px)]
             bottom-0
        z-20
         bg-gray-900 p-4 rounded-t-[20px] shadow-lg
        overflow-y-auto
         overflow-x-hidden
  ${
    isOpen ? "translate-y-0 " : "translate-y-[100%]"
  } transition-transform duration-300
        `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full   justify-center items-center mb-4 relative">
            {/* 닫기 버튼 */}
            <div
              className="absolute flex justify-center items-center rounded-full
                      bg-gray-900
              top-0 right-0  w-[28px] h-[28px]"
            >
              <button
                onClick={() => {
                  useCommonStore.getState().setIsModalOrBottomSheetOpen(false);
                  handleClose();
                }}
                className=" text-gray-500 "
              >
                <Svg
                  icon="xIcon"
                  options={{
                    size: { width: 24, height: 24 },
                    color: "gray-700",
                  }}
                />
              </button>
            </div>
          </div>
          {/* 이미지 */}
          <div className="flex w-[calc(100%+32px)] h-[356px] ml-[-16px] mt-[-32px]  ">
            <Image
              className="w-full object-cover rounded-t-[20px]"
              src={game.game.thumbnailUrl}
              alt="game"
              width={100}
              height={100}
            />
          </div>
          {/* 박��� 쉐도우 */}
          <div className="absolute w-full h-[162px] bottom-sheet left-0 top-[194px]  "></div>
          {/* 컨텐츠 내용들 */}
          <div
            className="absolute top-[323px] flex flex-col w-[calc(100%-32px)]
          h-fit mb-16 "
          >
            <div className="flex flex-col w-full h-full">
              {/* 장르, 제목, 작성자 */}
              <div className="flex flex-col gap-y-4">
                <span className="flex body-rg text-gray-100">
                  {GenresKorean[game.game.genre as keyof typeof GenresKorean]}
                </span>
                <span className="flex title1-sb text-white">
                  {game.game.title}
                </span>
                <div className="flex h-[28px] bg-gray-800 items-center rounded-[4px] w-fit px-2">
                  <span className="flex body-rg text-white">
                    @{game.game.producer.nickname}
                  </span>
                </div>
              </div>
              {/* 버튼들 */}
              <div className="flex flex-col gap-y-2 mt-8">
                <Button
                  value="새로하기"
                  onClick={() => {}}
                  bgColor="bg-gray-700"
                  textColor="text-gray-100"
                />
                {game.play && (
                  <Button
                    value={"이어하기:" + game.play.page?.abridgement}
                    onClick={() => {}}
                    bgColor="bg-green-500"
                    textColor="text-black"
                  />
                )}
              </div>

              {/* 상세 정보 */}
              <div className="flex flex-col gap-y-2 mt-8 mb-8">
                <span className="flex title2-sb text-gray-100">상세 정보</span>
                {/* 소요시간, 엔딩수 , 엔딩을 본 사람 */}
                <div
                  className="flex flex-row justify-center items-center gap-x-2
                w-full h-[89px] bg-gray-800 rounded-[12px]
                "
                >
                  <div className="flex flex-col w-[90px] justify-center items-center">
                    <span className="flex body-rg text-gray-200">소요시간</span>
                    <span className="flex headline-sb text-white">
                      {game.enrichData.expectPlayTime}분
                    </span>
                  </div>
                  <div className="h-[20px] border-r ml-3 mr-3 border-gray-700" />
                  <div className="flex flex-col w-[90px] justify-center items-center">
                    <span className="flex body-rg text-gray-200">엔딩수</span>
                    <span className="flex headline-sb text-white">
                      {game.enrichData.totalEnding}개
                    </span>
                  </div>
                  <div className="h-[20px] border-r ml-3 mr-3 border-gray-700" />
                  <div className="flex flex-col w-[90px] justify-center items-center">
                    <span className="flex body-rg text-gray-200">
                      엔딩을 본 사람
                    </span>
                    <span className="flex headline-sb text-white">
                      {game.enrichData.totalPlayCount}명
                    </span>
                  </div>
                </div>

                {/* 설명 */}
                <div className="flex flex-col gap-y-2 mt-6">
                  <span className="flex body-rg text-gray-200">
                    {game.game.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}