"use client";

import React from "react";

interface BottomButtonProps {
  onClickNewGame: () => void;
  onClickList: () => void;
}

export default function BottomButton({
  onClickNewGame,
  onClickList,
}: BottomButtonProps) {
  return (
    <div className="flex w-full h-[52px] gap-2">
      <div className="flex w-full bg-gray-700 rounded-[8px]">
        <span
          className="flex w-full text-title2 text-white justify-center items-center"
          onClick={onClickNewGame}
        >
          새로하기
        </span>
      </div>
      <div className="flex w-full bg-green-500 rounded-[8px]">
        <span
          className="flex w-full text-title2 text-black justify-center items-center"
          onClick={onClickList}
        >
          목록으로
        </span>
      </div>
    </div>
  );
}
