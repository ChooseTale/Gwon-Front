"use client";

import Svg from "@/common/Svg";
import React from "react";

interface NewPageButtonProps {
  onClick: () => void;
}

export default function NewPageButton({ onClick }: NewPageButtonProps) {
  return (
    <div
      className="fixed bottom-[32px] ml-[20px] mr-[20px] flex min-w-[280px] max-w-[560px] w-[calc(100%-40px)] h-[52px] items-center justify-center
    gap-1
    rounded-[8px] bg-green-500 text-black"
      onClick={onClick}
    >
      <div className="w-[24px] h-[24px]">
        <Svg
          icon="plusIcon"
          options={{ size: { width: 24, height: 24 }, color: "white" }}
        />
      </div>
      <div className="title2-md text-white">새 페이지</div>
    </div>
  );
}
