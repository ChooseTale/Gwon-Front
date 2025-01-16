"use client";

import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import BuilderGamePageTopNav from "./_component/TopNav";
import PageTitle from "./_component/PageTitle";
import BottomSheet from "./_component/BottomSheet";
import { getPage } from "@choosetale/nestia-type/lib/functional/game/page";
import { getPageCall } from "@/app/(actions)/builder/page/page";
import Block from "./_component/Block";
import ChoiceBlock from "./_component/ChoiceBlock";

export default function BuilderGamePage() {
  const { gameId, pageId } = useParams();

  const [page, setPage] = useState<getPage.Output | null>(null);
  const [activeBlockIdx, setActiveBlockIdx] = useState<number | null>(null);

  const isActiveBlock = useCallback(
    (idx: number) => {
      return activeBlockIdx === idx;
    },
    [activeBlockIdx]
  );

  useEffect(() => {
    const fetchPage = async () => {
      const res = await getPageCall(Number(gameId), Number(pageId));
      setPage(res);
    };
    fetchPage();
  }, [gameId, pageId]);

  return (
    <div className="flex w-full h-full flex-col bg-white">
      <div className="relative flex   ml-[20px] mr-[20px]  flex-col items-center  ">
        <BuilderGamePageTopNav />
        <PageTitle />
      </div>
      {/* 본문 */}
      <div
        id="page-content"
        className="flex w-full h-full flex-1 flex-col  mt-[12px] bg-gray-10
        overflow-y-auto
        "
      >
        <div className="flex ml-[20px] mr-[20px] flex-col gap-2">
          <div className="flex flex-col mt-4 gap-2">
            {page?.contents.map((content, idx) => (
              <div
                key={idx}
                id="page-content-container"
                className={`flex   flex-1 flex-col
           rounded-[6px] bg-white  p-3 border ${
             isActiveBlock(idx)
               ? "border-green-500 border-[2px] "
               : "border-gray-50"
           }`}
              >
                <Block
                  key={idx}
                  text={content.content}
                  isActive={isActiveBlock(idx)}
                  handleCancel={() => {
                    setActiveBlockIdx(null);
                  }}
                  handleComplete={() => {}}
                  clickBlock={() => {
                    console.log("click");
                    setActiveBlockIdx(idx);
                  }}
                />
              </div>
            ))}
          </div>
          {/* 선택지 */}
          <div id="choice-container" className="flex flex-col gap-2">
            {page?.choices.map((choice, idx) => (
              <div
                className="flex p-3 bg-gray-800 rounded-[6px] flex-col gap-2"
                key={idx}
              >
                <ChoiceBlock key={idx} order={idx + 1} text={choice.text} />
              </div>
            ))}
          </div>
          {/* 선택지 끝 */}
        </div>
      </div>
      {/* 본문 끝 */}
      <div className="fixed w-full min-w-[280px] max-w-[600px] h-[92px] bottom-0">
        <BottomSheet />
      </div>
    </div>
  );
}
