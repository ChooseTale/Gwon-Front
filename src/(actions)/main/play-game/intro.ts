"use server";

import { getIntroScreen } from "@choosetale/nestia-type/lib/functional/game_play/intro/index";
import { fetchIncetance } from "../../fetch";

export const getIntroScreenCall = async ({
  gameId,
}: {
  gameId: number;
}): Promise<getIntroScreen.Output> => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${getIntroScreen.path(gameId)}`,
    {}
  );

  return await res.json();
};
