"use client";

import Svg from "@/common/Svg";
import React, { useEffect, useState } from "react";
import ContinuedGamesCard from "./ContinuedGames/Card";
import { getContinuedGameList } from "@choosetale/nestia-type/lib/functional/my_page/continued_game";
import { getMyContinuedGameListCall } from "@/(actions)/main/my-game";
import Link from "next/link";

export default function ContinuedGames() {
  const [continuedGameList, setContinuedGameList] = useState<
    getContinuedGameList.Output["list"]
  >([]);

  useEffect(() => {
    const getMyContinuedGameList = async () => {
      const res = await getMyContinuedGameListCall({
        page: 1,
        limit: 8,
        order: "LATEST",
        genre: ["ALL"],
      });
      setContinuedGameList(res.list);
    };

    getMyContinuedGameList();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="title2-sb text-white">진행중인 게임</div>
        <Link href="/main/my/continued-game">
          <div className="flex  flex-row text-gray-500">
            <span className="body1-sb">전체보기</span>
            <Svg
              icon="chevronRightIcon"
              options={{ size: { width: 24, height: 24 }, color: "gray-500" }}
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-row  h-[244px] gap-2 flex-nowrap  overflow-x-auto overflow-y-hidden mt-[12px]">
        {continuedGameList.length === 0 ? (
          <div className="flex text-gray-400 body-sb w-full h-full justify-center items-center ">
            진행중인 게임이 없어요
          </div>
        ) : (
          continuedGameList.map((game) => (
            <div
              className="flex  w-[170px] h-[173px] "
              key={game.game.id.toString()}
            >
              <ContinuedGamesCard game={game} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
