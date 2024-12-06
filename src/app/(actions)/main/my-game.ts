"use server";

import { getContinuedGameList } from "@choosetale/nestia-type/lib/functional/my_page/continued_game/index";
import { fetchIncetance } from "../fetch";

export const getMyContinuedGameListCall = async (
  query: getContinuedGameList.Query
): Promise<getContinuedGameList.Output> => {
  const queryParams = new URLSearchParams({
    page: query.page.toString(),
    limit: query.limit.toString(),
    order: query.order,
    genre: query.genre.join(","),
  });

  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${
      getContinuedGameList.METADATA.path
    }?${queryParams.toString()}`,
    {}
  );
  return await res.json();
};
