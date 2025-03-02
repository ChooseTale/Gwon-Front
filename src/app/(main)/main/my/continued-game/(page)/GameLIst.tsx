"use client";

import React, { useEffect, useState, useRef } from "react";
import ContinuedGamesCard from "../../_components/ContinuedGames/Card";
import { getContinuedGameList } from "@choosetale/nestia-type/lib/functional/my_page/continued_game";
import { getMyContinuedGameListCall } from "@/(actions)/main/my-game";
import { useContinuedGameFilterStore } from "@/store/Game/continued/ContinuedGameFilter.store";
import { useContinuedGameOrderStore } from "@/store/Game/continued/ContinuedGameOrder.store";
import { GAME_LIST_LIMIT } from "@/lib/config";
import { useInView } from "react-intersection-observer";

export default function ContinuedGamesList() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const isInitialMount = useRef(true);

  const [ref, inView] = useInView();

  const [continuedGameList, setContinuedGameList] = useState<
    getContinuedGameList.Output["list"]
  >([]);

  const selectedGenres = useContinuedGameFilterStore(
    (state) => state.selectedGenres
  );
  const selectedOrder = useContinuedGameOrderStore(
    (state) => state.selectedOrder
  );

  // 필터나 정렬 옵션이 변경되면 리스트 초기화
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setContinuedGameList([]);
    setPage(1);
    setTotalCount(0);
  }, [selectedGenres, selectedOrder]);

  useEffect(() => {
    if (inView && !isLoading && continuedGameList.length < totalCount) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isLoading, continuedGameList.length, totalCount]);

  useEffect(() => {
    // 이미 데이터가 있고 첫 페이지가 아니면 요청하지 않음
    if (page !== 1 && continuedGameList.length > (page - 1) * GAME_LIST_LIMIT) {
      return;
    }

    const getMyContinuedGameList = async () => {
      setIsLoading(true);
      try {
        const res = await getMyContinuedGameListCall({
          page: page,
          limit: GAME_LIST_LIMIT,
          order: selectedOrder,
          genre: selectedGenres.length > 0 ? selectedGenres : ["ALL"],
        });

        if (page === 1) {
          setContinuedGameList(res.list);
        } else {
          setContinuedGameList((prev) => [...prev, ...res.list]);
        }
        setTotalCount(res.count);
      } catch (error) {
        console.error("Failed to fetch game list:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getMyContinuedGameList();
  }, [selectedGenres, selectedOrder, page]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap gap-2">
        {continuedGameList.map((game) => (
          <div
            className="flex w-[calc(50%-4px)]
            cardScreen1:w-[calc(33.33%-8px)]
            cardScreen2:w-[180px]
              max-w-[180px] "
            key={game.game.id.toString()}
          >
            <ContinuedGamesCard game={game} />
          </div>
        ))}
      </div>
      {!isLoading && <div id="load" ref={ref} className="h-[1px]" />}
    </div>
  );
}
