"use server";

import { getAll } from "@choosetale/nestia-type/lib/functional/game/index";
import { fetchIncetance } from "../fetch";

export const builder = async (gameId: number): Promise<getAll.Output> => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${getAll.path(gameId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await res.json();
};
