"use server";

import {
  $delete,
  getPage,
} from "@choosetale/nestia-type/lib/functional/game/page/index";
import { update } from "@choosetale/nestia-type/lib/functional/game/page/index";

import { fetchIncetance } from "../../fetch";
import { getAll } from "@choosetale/nestia-type/lib/functional/game";
import { create } from "@choosetale/nestia-type/lib/functional/game/page";

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

export const createPageCall = async (
  gameId: number,
  body: create.Input
): Promise<create.Output> => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${create.path(gameId)}`,
    {
      method: create.METADATA.method,
      body: JSON.stringify(body),
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
  formData.append("choices", JSON.stringify(body.choices));
  if (backgroundImage) {
    formData.append("image", backgroundImage);
  }
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${update.path(gameId, pageId)}`,
    {
      method: update.METADATA.method,
      body: formData,
    }
  );
  return await res.json();
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

export const deletePageCall = async (gameId: number, pageId: number) => {
  await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${$delete.path(gameId, pageId)}`,
    {
      method: $delete.METADATA.method,
    }
  );
};
