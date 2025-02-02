"use server";

import { getContinuedGameList } from "@choosetale/nestia-type/lib/functional/my_page/continued_game/index";

import { fetchIncetance } from "../fetch";
import { getEndedGroupGameList } from "@choosetale/nestia-type/lib/functional/my_page/ended_game/group_game";

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

export const getMyEndedGameGroupListCall = async (
  query: getEndedGroupGameList.Query
): Promise<getEndedGroupGameList.Output> => {
  const queryParams = new URLSearchParams({
    page: query.page.toString(),
    limit: query.limit.toString(),
    order: query.order,
    genre: query.genre.join(","),
  });

  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${
      getEndedGroupGameList.METADATA.path
    }?${queryParams.toString()}`,
    {}
  );
  return await res.json();
};
