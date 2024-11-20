"use client";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";
import type { GameListOption } from "@/interface/customType";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import GameListOrder from "./GameListOrder";
import GenresFilterDraw from "./GenresFilterDraw";

interface FilterComponentProps {
  searchParams: FormattedSearchParams;
  option: GameListOption;
}

export default function GameListFilters({
  searchParams,
  option,
}: FilterComponentProps) {
  const { updateSearchParams } = useUpdateSearchParams();

  const handleGenreChange = (newGenre: string) => {
    updateSearchParams("genre", newGenre);
  };

  const handleOrderChange = (newOrder: string) => {
    updateSearchParams("order", newOrder);
  };

  return (
    <>
      <GenresFilterDraw
        searchParams={searchParams}
        handleGenreChange={handleGenreChange}
      />
      {option && (
        <GameListOrder
          searchParams={searchParams}
          handleOrderChange={handleOrderChange}
          option={option}
        />
      )}
    </>
  );
}
