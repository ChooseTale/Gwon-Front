"use client";

import Svg from "@/common/Svg";
import { useRouter } from "next/navigation";
import React from "react";

export default function BuilderGamePageSettingTopNav({
  handleComplete,
}: {
  handleComplete: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex w-full relative h-[48px] justify-center items-center">
      <div className="absolute left-0">
        {/* 뒤로가기 */}
        <div
          className="flex  flex-row text-gray-500"
          onClick={() => {
            router.back();
          }}
        >
          <Svg
            icon="chevronLeftIcon"
            options={{ size: { width: 32, height: 32 }, color: "black" }}
          />
        </div>
      </div>

      <div className="absolute flex  flex-row right-0 gap-3">
        <div
          className="flex headline-md flex-row justify-center items-center text-green-500"
          onClick={handleComplete}
        >
          다음
        </div>
      </div>
    </div>
  );
}
