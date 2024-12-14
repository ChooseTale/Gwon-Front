import Svg from "@/common/Svg";
import Link from "next/link";
import React from "react";

export default function EndedGameTopNav() {
  return (
    <div className="relative flex items-center justify-center h-[48px]">
      <div className="absolute h-full flex items-center left-0 cursor-pointer">
        <Link href="/main/my">
          <Svg
            icon="chevronLeftIcon"
            options={{ size: { width: 24, height: 24 }, color: "white" }}
          />
        </Link>
      </div>
      <span className="ml-2 text-white flex items-center">내가 본 엔딩</span>
    </div>
  );
}
