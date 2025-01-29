import Svg from "@/common/Svg";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function BuilderGamePageTopNav({
  gameTitle,
  handleComplete,
  handleDelete,
}: {
  gameTitle: string;
  handleComplete: () => void;
  handleDelete: () => void;
}) {
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
      <div className="absolute flex flex-row right-0 gap-3">
        <div className="flex flex-row text-gray-400" onClick={handleDelete}>
          삭제
        </div>
        <div className="flex flex-row text-green-500" onClick={handleComplete}>
          완료
        </div>
      </div>
    </div>
  );
}
