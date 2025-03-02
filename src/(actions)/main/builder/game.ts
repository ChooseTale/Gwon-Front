"use server";

import { getMyBuildedGames } from "@choosetale/nestia-type/lib/functional/my_page/game_builder/index";
import { fetchIncetance } from "../../fetch";
import { GenresKorean } from "@/common/Game/Genre";

interface GetBuildingGamesProps {
  genre: (keyof typeof GenresKorean)[];
  order: getMyBuildedGames.Query["order"];
  status: getMyBuildedGames.Query["status"];
  page: number;
  limit: number;
}

export const getBuildingGamesCall = async ({
  genre,
  order,
  status,
  page,
  limit,
}: GetBuildingGamesProps): Promise<getMyBuildedGames.Output> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    genre: genre.length > 0 ? genre.join(",") : "ALL",
    order,
    status,
  });
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${
      getMyBuildedGames.METADATA.path
    }?${queryParams.toString()}`,
    {}
  );

  return await res.json();
};
