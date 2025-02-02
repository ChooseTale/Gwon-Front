"use server";

import { create, update } from "@choosetale/nestia-type/lib/functional/game";
import { uploadImages } from "@choosetale/nestia-type/lib/functional/game/upload_thumbnail";

import { fetchIncetance } from "../../fetch";

export const createGameCall = async (body: create.Input) => {
  try {
    const res = await fetchIncetance(
      `${process.env.NEXT_PUBLIC_BACKEND_API}${create.path()}`,
      {
        method: create.METADATA.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    return res.json() as Promise<create.Output>;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadThumbnailCall = async (body: {
  gameId: number;
  images: { file: File; isThumbnail: boolean }[];
}) => {
  try {
    const formData = new FormData();
    body.images.forEach((image) => {
      formData.append("images", image.file);
    });
    const res = await fetchIncetance(
      `${process.env.NEXT_PUBLIC_BACKEND_API}${uploadImages.path(
        Number(body.gameId)
      )}`,
      {
        method: uploadImages.METADATA.method,
        body: formData,
      }
    );

    return (await res.json()) as Promise<uploadImages.Output>;
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
