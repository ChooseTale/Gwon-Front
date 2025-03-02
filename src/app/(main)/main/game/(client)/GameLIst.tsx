"use client";

import { getGameListCall, getGameListCountCall } from "@/(actions)/main/game";
import React, { useEffect, useState, useRef } from "react";
import CardList from "../_components/CardList";
import { GameListEntity } from "../../../_domain/game-list.entity";
import { useGameFilterStore } from "@/store/Game/GameFilter.store";
import { useGameOrderStore } from "@/store/Game/GameOrder.store";
import { useInView } from "react-intersection-observer";
import { GAME_LIST_LIMIT } from "@/lib/config";

export default function GameList() {
  const [page, setPage] = useState(1);
  const [gameList, setGameList] = useState<GameListEntity>(
    new GameListEntity([])
  );
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const [ref, inView] = useInView();

  const selectedGenres = useGameFilterStore((state) => state.selectedGenres);
  const selectedOrder = useGameOrderStore((state) => state.selectedOrder);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchTotalCount = async () => {
      const count = await getGameListCountCall(selectedGenres);
      setTotalCount(count.count);
      setGameList(new GameListEntity([]));
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
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isLoading, totalCount]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setPage(1);
    setGameList(new GameListEntity([]));
  }, [selectedGenres, selectedOrder]);

  useEffect(() => {
    // 이미 데이터가 있고 첫 페이지가 아니면 요청하지 않음
    if (page !== 1 && gameList.gameList.length > (page - 1) * GAME_LIST_LIMIT) {
      return;
    }

    const getGameList = async () => {
      setIsLoading(true);
      try {
        const res = await getGameListCall({
          genres: selectedGenres,
          order: selectedOrder,
          page,
        });

        if (page === 1) {
          setGameList(new GameListEntity(res));
        } else {
          setGameList((prev) => new GameListEntity([...prev.gameList, ...res]));
        }
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
