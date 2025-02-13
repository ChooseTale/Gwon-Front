"use server";

import { fetchIncetance } from "@/(actions)/fetch";
import { getResultScreen } from "@choosetale/nestia-type/lib/functional/game_play/result";

export const getEndingDataCall = async (playId: number) => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${getResultScreen.path(playId)}`,
    { method: getResultScreen.METADATA.method }
  );

  return await res.json();
};
