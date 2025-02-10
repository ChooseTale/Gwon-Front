"use server";

import { fetchIncetance } from "@/(actions)/fetch";
import { chooseChoice } from "@choosetale/nestia-type/lib/functional/game_play/play/choice";
import { getPlayGameScreen } from "@choosetale/nestia-type/lib/functional/game_play/play/index";
import { endPlay } from "@choosetale/nestia-type/lib/functional/game_play/play/page/end";

export const getPlayData = async (playId: number) => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${getPlayGameScreen.path(playId)}`,
    {}
  );
  return (await res.json()) as getPlayGameScreen.Output;
};

export const chooseChoiceCall = async (playId: number, choiceId: number) => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${chooseChoice.path(
      playId,
      choiceId
    )}`,
    {
      method: chooseChoice.METADATA.method,
    }
  );
  return (await res.json()) as chooseChoice.Output;
};

export const endGameCall = async (playId: number, pageId: number) => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${endPlay.path(playId, pageId)}`,
    {
      method: endPlay.METADATA.method,
    }
  );
  return true;
};
