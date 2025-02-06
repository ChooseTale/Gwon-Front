"use server";

import { create, update } from "@choosetale/nestia-type/lib/functional/game";

import { fetchIncetance } from "../../fetch";

export const createGameCall = async (
  body: create.Input,
  imageFiles: File[]
) => {
  try {
    const formData = new FormData();
    formData.append("title", body.title);
    formData.append("genre", body.genre);
    formData.append("description", body.description);
    formData.append("thumbnailFileIdx", body.thumbnailFileIdx.toString());
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    const res = await fetchIncetance(
      `${process.env.NEXT_PUBLIC_BACKEND_API}${create.path()}`,
      {
        method: create.METADATA.method,
        body: formData,
      }
    );
    return res.json() as Promise<create.Output>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateGameCall = async (gameId: number, body: update.Input) => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${update.path(Number(gameId))}`,
    {
      method: update.METADATA.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  return await res.json();
};
