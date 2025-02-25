"use server";

import { fetchIncetance } from "@/(actions)/fetch";
import { recommendChoicesByExternalService } from "@choosetale/nestia-type/lib/functional/game/page/recommend_choices";

export const recommendChoices = async (gameId: number, pageId: number) => {
  try {
    await fetchIncetance(
      `${
        process.env.NEXT_PUBLIC_BACKEND_API
      }${recommendChoicesByExternalService.path(gameId, pageId)}`,
      {
        method: recommendChoicesByExternalService.METADATA.method,
      }
    );
  } catch (err) {
    console.log(err);
  }
};
