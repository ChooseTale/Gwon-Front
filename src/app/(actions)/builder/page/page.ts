"use server";

import { getPage } from "@choosetale/nestia-type/lib/functional/game/page/index";
import { fetchIncetance } from "../../fetch";

export const getPageCall = async (gameId: number, pageId: number) => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${getPage.path(gameId, pageId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
};
