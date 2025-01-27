import Svg from "@/common/Svg";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function BuilderGameTopNav({
  gameTitle,
  handleComplete,
}: {
  gameTitle: string;
  handleComplete: () => void;
}) {
  const { gameId } = useParams();
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
      <div className="absolute right-[20px]">
        <div className="flex flex-row text-green-500" onClick={handleComplete}>
          완료
        </div>
      </div>
    </div>
  );
}
