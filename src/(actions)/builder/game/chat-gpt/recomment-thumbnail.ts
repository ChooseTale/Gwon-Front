"use server";

import { fetchIncetance } from "@/(actions)/fetch";
import { recommendImage } from "@choosetale/nestia-type/lib/functional/game/recommend_image";

export const recommendThumbnail = async (body: recommendImage.Input) => {
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${recommendImage.path(1)}`,
    {
      method: recommendImage.METADATA.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  return await res.json();
};
