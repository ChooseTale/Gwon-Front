"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BuilderGamePageTopNav from "./_component/TopNav";
import PageTitle from "./_component/PageTitle";
import BottomSheet from "./_component/BottomSheet";
import { getPage } from "@choosetale/nestia-type/lib/functional/game/page";
import { getPageCall } from "@/app/(actions)/builder/page/page";

export default function BuilderGamePage() {
  const { gameId, pageId } = useParams();

  const [page, setPage] = useState<getPage.Output | null>(null);
  console.log(page);
  useEffect(() => {
    const fetchPage = async () => {
      const res = await getPageCall(Number(gameId), Number(pageId));
      setPage(res);
    };
    fetchPage();
  }, [gameId, pageId]);
  return (
    <div className="flex w-full h-full flex-col bg-white">
      <div className="relative flex w-full   flex-col items-center  ml-[20px] mr-[20px]">
        <BuilderGamePageTopNav />
        <PageTitle />
      </div>
      {/* 본문 */}
      <div className="flex w-full h-full flex-1 mt-[12px] bg-gray-10"></div>
      {/* 본문 끝 */}
      <div className="absolute w-full h-[92px] bottom-0">
        <BottomSheet />
      </div>
    </div>
  );
}
