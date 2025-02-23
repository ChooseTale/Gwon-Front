"use client";

import { getEndingDataCall } from "@/(actions)/main/play-game/ending";
import { getResultScreen } from "@choosetale/nestia-type/lib/functional/game_play/result";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EndingCard from "./_component/Card";
import Svg from "@/common/Svg";
import BottomButton from "./_component/BottomButton";
import { firstStartGameCall } from "@/(actions)/main/play-game/intro";

export default function EndingPage() {
  const { playId } = useParams();
  const router = useRouter();
  const [endingData, setEndingData] = useState<getResultScreen.Output>();

  useEffect(() => {
    const fetchEndingData = async () => {
      const data = await getEndingDataCall(Number(playId));
      setEndingData(data);
    };
    fetchEndingData();
  }, [playId]);

  if (!endingData) return <div>Loading...</div>;

  return (
    <div className="flex">
      <div className="w-full bg-background-dark">
        {/* 엔딩 */}
        <div className="flex justify-center items-center h-[48px] text-white headline-md">
          엔딩
        </div>
        <div className="flex flex-col ">
          <div className="flex mt-[48px] text-white title-sb   text-[24px]">
            {/* 엔딩 페이지 제목 */}
            {endingData.endingPage.title}
          </div>
          <div className="flex justify-start mt-4">
            <div className="text-gray-100 text-caption">
              플레이 횟수 {endingData.enrich.totalEndingCount}
            </div>
            <div className="flex ml-[13px] text-gray-100 text-caption">
              엔딩 {endingData.enrich.reachEndingCount}/
              {endingData.enrich.totalEndingCount}
            </div>
          </div>
          <div className="flex mt-[96px] text-gray-200 body-md">
            선택한 페이지
          </div>
          <div className="flex mt-[16px] flex-col mb-[32px]">
            {endingData.choosenPages.map((ending, idx) => (
              <div key={ending.id}>
                <EndingCard
                  title={ending.title}
                  endings={ending.choices.map((choice) => ({
                    title: choice.title,
                    percentage: Math.floor(choice.percentage * 1000) / 10,
                    isSelected: choice.isSelected,
                  }))}
                />
                {idx !== endingData.choosenPages.length - 1 && (
                  <div className="flex relative h-[39px] justify-center items-center z-10">
                    <div className="absolute top-[3px] left-0 w-full h-full">
                      <Svg
                        icon="lineIcon"
                        options={{
                          size: {
                            width: 7,
                            height: 39,
                          },
                          viewBox: "0 0 7 39",
                        }}
                      />
                    </div>
                    {/* <hr
                      className="h-[36px] opacity-80 w-10  border-t-2 border-dashed "
                      style={{
                        borderImage:
                          "linear-gradient(to right, #3FB76A, #1C512F) 1",
                      }}
                    /> */}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* 바텀 시트 */}
          <BottomButton
            onClickNewGame={async () => {
              const res = await firstStartGameCall({
                gameId: endingData.enrich.gameId,
              });

              router.push(`/play/${res.playId}`);
            }}
            onClickList={() => {
              router.push("/main/game");
            }}
          />
          <div className="mb-[32px]"></div>
        </div>
      </div>
    </div>
  );
}
