"use client";

import Svg from "@/common/Svg";
import { useCommonStore } from "@/store/common.store";
import React from "react";

export default function MoveTopButton({ onClick }: { onClick: () => void }) {
  const isModalOrBottomSheetOpen = useCommonStore(
    (state) => state.isModalOrBottomSheetOpen
  );

  if (isModalOrBottomSheetOpen) {
    return <></>;
  }

  return (
    <div id="move-top-button" className="flex flex-col w-full h-full">
      <button
        onClick={onClick}
        className="z-30 fixed bottom-[96px] right-[20px]
          bg-gray-700  rounded-full w-[48px] h-[48px]
          focus:outline-none transition-opacity duration-300 ease-in-out"
      >
        <Svg
          icon="chevronUpIcon"
          options={{ size: { width: 30, height: 30 }, color: "white" }}
        />
      </button>
    </div>
  );
}
