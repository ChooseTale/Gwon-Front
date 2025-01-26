"use server";

import { getPage } from "@choosetale/nestia-type/lib/functional/game/page/index";
import { update } from "@choosetale/nestia-type/lib/functional/game/page/index";
import { fetchIncetance } from "../../fetch";
import { getAll } from "@choosetale/nestia-type/lib/functional/game";

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

export const updatePageCall = async (
  gameId: number,
  pageId: number,
  body: update.Input,
  backgroundImage?: File | null
) => {
  const formData = new FormData();
  formData.append("title", body.title);
  formData.append("contents", JSON.stringify(body.contents));
  formData.append("isEnding", body.isEnding.toString());
  if (backgroundImage) {
    formData.append("image", backgroundImage);
  }
  await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${update.path(gameId, pageId)}`,
    {
      method: update.METADATA.method,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    }
  );
};

export const getAllGameCall = async (
  gameId: number
): Promise<getAll.Output> => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${getAll.path(gameId)}`,
    {
      method: getAll.METADATA.method,
    }
  );

  return await res.json();
};
