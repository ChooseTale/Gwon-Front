import Svg from "@/common/Svg";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function BuilderGamePageTopNav() {
  const { gameId } = useParams();
  return (
    <div className="flex w-full relative h-[48px] justify-center items-center">
      <div className="absolute left-0">
        <Link href={`/builder/game/${gameId}`}>
          <div className="flex  flex-row text-gray-500">
            <Svg
              icon="chevronLeftIcon"
              options={{ size: { width: 32, height: 32 }, color: "black" }}
            />
          </div>
        </Link>
      </div>
      <div className="title2-sb text-black headline-md">새 페이지</div>
    </div>
  );
}
