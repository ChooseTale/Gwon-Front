"use client";

import Svg from "@/common/Svg";
import { useCommonStore } from "@/store/common.store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EndingCard from "./EndingCard";

interface Step1EndingIntroProps {
  totalEndingCount: number;
  endings: {
    playId: number;
    endingNumber: number;
    abridgement: string;
    reachedEndingAt: string;
  }[];
  handleClose: () => void;
}

export default function Step1EndingIntro({
  totalEndingCount,
  endings,
  handleClose,
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
         bg-gray-900 p-4 rounded-t-[20px] shadow-lg
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

            <div className="flex w-full ml-[20px] flex-col mr-[20px] h-full ">
              {/* 제목, 이미지, 내용 */}
              <div className="flex w-full h-[100px] flex-row  mt-[68px] gap-x-3">
                <div className="flex w-[90px] h-[90px] aspect-square">
                  <Image
                    className="object-cover rounded-[4px]"
                    src={
                      "https://img.sbs.co.kr/newsnet/etv/upload/2024/04/25/30000922260_1280.jpg"
                    }
                    alt="영화 이미지"
                    width={100}
                    height={100}
                  />
                </div>
                {/* 장르, 제목, 작성자 */}
                <div className="flex flex-col w-full h-full justify-between items-start gap-y-2 ">
                  <div className="flex  caption-rg text-gray-100">미스테리</div>
                  <div className="flex headline-rg text-white line-clamp-2 h-[44px]">
                    미스테리 영화 속 미스테리 두줄일 수도 있어용 히히히히히
                  </div>
                  <div
                    className="flex h-[28px] bg-gray-800 items-center rounded-[4px] w-fit
                  pb-[2px] pt-[2px]
                    pl-[6px] pr-[6px]"
                  >
                    <span className="flex body-rg text-white">
                      @사용자사용자
                    </span>
                  </div>
                </div>
              </div>
              {/* 엔딩 리스트 */}
              <div className="flex w-full h-full flex-col  mt-[32px]">
                <span className="flex w-full title2-sb  text-white">엔딩</span>
                <div className="flex w-full h-[460px] gap-y-[12px] flex-col   mt-3">
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
                                content: endings[index].abridgement,
                              }
                            : null
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
