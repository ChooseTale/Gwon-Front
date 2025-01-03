"use client";

import Svg from "@/common/Svg";
import { useRouter } from "next/navigation";
import React from "react";

export default function NewGameButton() {
  const router = useRouter();
  return (
    <div
      className="absolute bottom-[24px] flex w-[136px] h-[52px] items-center justify-center
    gap-1
    rounded-[58px] bg-green-500 text-black"
      onClick={() => {
        router.push("/main/builder/new-game");
      }}
    >
      <div className="w-[24px] h-[24px]">
        <Svg
          icon="plusIcon"
          options={{ size: { width: 24, height: 24 }, color: "black" }}
        />
      </div>
      <div>새 게임</div>
    </div>
  );
}
