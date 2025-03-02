"use client";

import { getGameListCall, getGameListCountCall } from "@/(actions)/main/game";
import React, { useCallback, useEffect, useState } from "react";
import CardList from "../_components/CardList";
import { GameListEntity } from "../../../_domain/game-list.entity";
import { useGameFilterStore } from "@/store/Game/GameFilter.store";
import { useGameOrderStore } from "@/store/Game/GameOrder.store";
import { useInView } from "react-intersection-observer";
export default function GameList() {
  const [page, setPage] = useState(1);
  const [gameList, setGameList] = useState<GameListEntity>(
    new GameListEntity([])
  );
  const [isLoading, setIsLoading] = useState(false);

  const [ref, inView] = useInView();

  const selectedGenres = useGameFilterStore((state) => state.selectedGenres);
  const selectedOrder = useGameOrderStore((state) => state.selectedOrder);

  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchTotalCount = async () => {
      const count = await getGameListCountCall(selectedGenres);

      setTotalCount(count.count);
    };

    fetchTotalCount();
  }, [selectedGenres]);

  useEffect(() => {
    if (
      inView &&
      !isLoading &&
      gameList.gameList.length > 0 &&
      gameList.gameList.length < totalCount
    ) {
      setPage((page) => page + 1);
    }
  }, [inView, isLoading, gameList.gameList.length, totalCount]);

  useEffect(() => {
    setGameList(new GameListEntity([]));
    setPage(1);
  }, [selectedGenres, selectedOrder]);

  useEffect(() => {
    if (page === 0) return;

    const getGameList = async () => {
      setIsLoading(true);
      try {
        const res = await getGameListCall({
          genres: selectedGenres,
          order: selectedOrder,
          page,
        });
        console.log(res);
        setGameList((prev) => new GameListEntity([...prev.gameList, ...res]));
      } catch (error) {
        console.error("Failed to fetch game list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getGameList();
  }, [selectedGenres, selectedOrder, page]);

  return (
    <div className="flex flex-col h-full">
      <CardList gameList={gameList} />
      {!isLoading && <div ref={ref} className="h-[1px]" />}
    </div>
  );
}
