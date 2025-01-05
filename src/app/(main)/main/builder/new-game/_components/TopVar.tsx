import Svg from "@/common/Svg";
import Link from "next/link";
import React from "react";

export default function TopVar() {
  return (
    <div className="flex relative h-[48px] justify-center items-center">
      <div className="absolute left-0">
        <Link href="/main/builder">
          <div className="flex  flex-row text-gray-500">
            <Svg
              icon="chevronLeftIcon"
              options={{ size: { width: 24, height: 24 }, color: "white" }}
            />
          </div>
        </Link>
      </div>
      <div className="title2-sb text-white">게임 만들기</div>
    </div>
  );
}
