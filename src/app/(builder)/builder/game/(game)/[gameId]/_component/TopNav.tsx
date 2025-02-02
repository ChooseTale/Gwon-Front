import Svg from "@/common/Svg";
import Link from "next/link";
import React from "react";

export default function BuilderGameTopNav({
  gameTitle,
  handleComplete,
  handleTest,
}: {
  gameTitle: string;
  handleComplete: () => void;
  handleTest: () => void;
}) {
  return (
    <div className="flex w-full bg-white relative h-[48px] justify-center items-center">
      <div className="absolute left-[20px]">
        <Link href={`/main/builder`}>
          <div className="flex  flex-row text-gray-500">
            <Svg
              icon="chevronLeftIcon"
              options={{ size: { width: 32, height: 32 }, color: "black" }}
            />
          </div>
        </Link>
      </div>
      <div className="title2-sb text-black headline-md">{gameTitle}</div>

      <div className="absolute flex flex-row right-[20px] gap-2">
        <div className="flex flex-row text-green-500" onClick={handleTest}>
          테스트
        </div>
        <div className="flex flex-row text-green-500" onClick={handleComplete}>
          완료
        </div>
      </div>
    </div>
  );
}
