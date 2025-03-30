import Svg from "@/common/Svg";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function BuilderGamePageTopNav({
  pageTitle,
  handleComplete,
  handleDelete,
}: {
  gameTitle: string;
  pageTitle: string;
  handleComplete: () => void;
  handleDelete: () => void;
}) {
  const { gameId, pageId } = useParams();
  const router = useRouter();
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
      <div className="title2-sb text-black headline-md">{pageTitle}</div>
      <div className="absolute flex  flex-row right-0 gap-3">
        <div
          className="flex flex-row text-gray-400"
          onClick={() => {
            router.push(`/builder/game/${gameId}/page/${pageId}/setting`);
          }}
        >
          <Svg
            icon="settingsIcon"
            options={{ size: { width: 18, height: 18 }, color: "gray-500" }}
          />
        </div>
        <div
          className="flex headline-md flex-row justify-center items-center text-green-500"
          onClick={handleComplete}
        >
          완료
        </div>
      </div>
    </div>
  );
}
