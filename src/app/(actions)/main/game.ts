"use server";

import { fetchIncetance } from "@/app/(actions)/fetch";
import { GenresKorean } from "@/common/Game/Genre";
import { getList } from "@choosetale/nestia-type/lib/functional/game_play/list/index";

interface GetGameListCallProps {
  genres: (keyof typeof GenresKorean)[];
  order: "LATEST" | "OLDEST" | "POPULAR";
}

interface GetStaticGameListCallProps {
  genres: (keyof typeof GenresKorean)[];
  order: "LATEST" | "OLDEST" | "POPULAR";
  revalidateOption: {
    time: number;
  };
}

export const getGameListCall = async ({
  genres,
  order,
}: GetGameListCallProps): Promise<getList.Output> => {
  const queryParams = new URLSearchParams({
    page: "1",
    limit: "10",
    order,
    genre: genres.length > 0 ? genres.join(",") : "ALL",
  });

  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${
      getList.METADATA.path
    }?${queryParams.toString()}`,
    {}
  );

  return await res.json();
};

export const getStaticGameListCall = async ({
  genres,
  order,
  revalidateOption,
}: GetStaticGameListCallProps): Promise<getList.Output> => {
  const queryParams = new URLSearchParams({
    page: "1",
    limit: "5",
    order,
    genre: genres.length > 0 ? genres.join(",") : "ALL",
  });

  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${
      getList.METADATA.path
    }?${queryParams.toString()}`,
    {
      next: {
        revalidate: revalidateOption.time,
      },
    }
  );

  return await res.json();
};
