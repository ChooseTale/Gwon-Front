"use server";

import { fetchIncetance } from "@/app/(actions)/fetch";
import { getList } from "@choosetale/nestia-type/lib/functional/game_play/list/index";

export const getGameListCall = async (): Promise<getList.Output> => {
  const queryParams = new URLSearchParams({
    page: "1",
    limit: "10",
    order: "LATEST",
    genre: "ALL",
  });

  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${
      getList.METADATA.path
    }?${queryParams.toString()}`,
    {}
  );

  return await res.json();
};
