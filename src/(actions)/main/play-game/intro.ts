"use server";

import { getIntroScreen } from "@choosetale/nestia-type/lib/functional/game_play/intro/index";
import { fetchIncetance } from "../../fetch";
import { firstStartGame } from "@choosetale/nestia-type/lib/functional/game_play/intro/first_start";

export const getIntroScreenCall = async ({
  gameId,
}: {
  gameId: number;
}): Promise<getIntroScreen.Output> => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${getIntroScreen.path(gameId)}`,
    {
      next: {
        revalidate: 3600,
        tags: [`intro-screen-${gameId}`],
      },
    }
  );

  return await res.json();
};

export const firstStartGameCall = async ({
  gameId,
}: {
  gameId: number;
}): Promise<firstStartGame.Output> => {
  const newPlayData = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${firstStartGame.path(gameId)}`,
    { method: firstStartGame.METADATA.method }
  );

  return await newPlayData.json();
};
