"use client";
import Svg from "@/common/Svg";
import Link from "next/link";
import React from "react";

export default function EndedGameNav() {
  return (
    <div className="flex justify-between items-center title2-sb flex-row text-white mt-[24px] ">
      <span>내가 본 엔딩</span>
      <Link href="/main/my/ended-game">
        <Svg
          icon="chevronRightIcon"
          options={{ size: { width: 32, height: 32 }, color: "gray-500" }}
        />
      </Link>
    </div>
  );
}
