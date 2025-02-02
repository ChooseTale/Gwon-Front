"use client";

import Svg from "@/common/Svg";
import { useCommonStore } from "@/store/common.store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EndingCard from "./EndingCard";
import { GenresKorean } from "@/common/Game/Genre";

interface Step1EndingIntroProps {
  totalEndingCount: number;
  game: {
    title: string;
    genre: string;
    thumbnail: {
      url: string;
    };
    producer: {
      name: string;
    };
  };
  endings: {
    playId: number;
    endingNumber: number;
    title: string;
    reachedEndingAt: string;
  }[];
  handleClose: () => void;
  handleStep: (step: string) => void;
}

export default function Step1EndingIntro({
  totalEndingCount,
  endings,
  game,
  handleClose,
  handleStep,
}: Step1EndingIntroProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    useCommonStore.getState().setIsModalOrBottomSheetOpen(true);
    new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
      setIsOpen(true);
    });
  }, []);

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
         bg-gray-900 pl-4 pr-4 rounded-t-[20px] shadow-lg
        overflow-y-auto
         overflow-x-hidden

  ${
    isOpen ? "translate-y-0 " : "translate-y-[100%]"
  } transition-transform duration-300
        `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full    justify-center items-center mb-4 relative">
            {/* 닫기 버튼 */}
            <div
              className="absolute flex justify-center items-center rounded-full
                      bg-gray-900
              top-[26px] right-[6px]  w-[28px] h-[28px]"
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
                    color: "white",
                  }}
                />
              </button>
            </div>

            <div className="flex w-full ml-[20px] flex-col mr-[20px] h-full ">
              {/* 제목, 이미지, 내용 */}
              <div className="flex w-full h-[100px] flex-row  mt-[68px] gap-x-3">
                <div className="flex w-[90px] h-[90px] aspect-square">
                  <Image
                    className="object-cover rounded-[4px]"
                    src={game.thumbnail.url}
                    alt="영화 이미지"
                    layout="responsive"
                    width={100}
                    height={100}
                  />
                </div>
                {/* 장르, 제목, 작성자 */}
                <div className="flex flex-col w-full h-full justify-between items-start gap-y-2 ">
                  <div className="flex  caption-rg text-gray-100">
                    {GenresKorean[game.genre as keyof typeof GenresKorean]}
                  </div>
                  <div className="flex headline-rg text-white line-clamp-2 h-[44px]">
                    {game.title}
                  </div>
                  <div
                    className="flex h-[28px] bg-gray-800 items-center rounded-[4px] w-fit
                  pb-[2px] pt-[2px]
                    pl-[6px] pr-[6px]"
                  >
                    <span className="flex body-rg text-white">
                      @{game.producer.name}
                    </span>
                  </div>
                </div>
              </div>
              {/* 엔딩 리스트 */}
              <div className="flex w-full h-full flex-col   mt-[32px]">
                <span className="flex w-full title2-sb  text-white">엔딩</span>
                <div className="flex w-full  gap-y-[12px] flex-col    mt-3">
                  {Array.from({ length: totalEndingCount }).map((_, index) => {
                    return (
                      <EndingCard
                        key={index}
                        endingNumber={index + 1}
                        ending={
                          endings[index]
                            ? {
                                createdAt: new Date(
                                  endings[index].reachedEndingAt
                                ),
                                content: endings[index].title,
                              }
                            : null
                        }
                      />
                    );
                  })}
                </div>
              </div>
              {/* 게임 상세보기 버튼 */}
              <div
                className="flex w-full h-[52px] pt-[10px] pb-[10px]  border-gray-600 border-[1px] rounded-[4px] justify-center items-center mt-3"
                onClick={() => {
                  handleStep("step2");
                }}
              >
                <span className="flex body-rg text-white items-center gap-x-1">
                  게임 상세보기
                  <div className="flex justify-center items-center">
                    <Svg
                      icon="chevronRightIcon"
                      options={{
                        size: { width: 24, height: 24 },
                        color: "white",
                      }}
                    />
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
