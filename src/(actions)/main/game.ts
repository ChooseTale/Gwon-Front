"use server";

import { fetchIncetance } from "@/(actions)/fetch";
import { GenresKorean } from "@/common/Game/Genre";
import { GAME_LIST_LIMIT } from "@/lib/config";
import { getCount } from "@choosetale/nestia-type/lib/functional/game_play/list/count";
import { getList } from "@choosetale/nestia-type/lib/functional/game_play/list/index";

interface GetGameListCallProps {
  genres: (keyof typeof GenresKorean)[];
  order: "LATEST" | "OLDEST" | "POPULAR";
  page: number;
}

interface GetStaticGameListCallProps {
  genres: (keyof typeof GenresKorean)[];
  order: "LATEST" | "OLDEST" | "POPULAR";
  revalidateOption: {
    time: number;
  };
}

export const getGameListCountCall = async (
  genres: (keyof typeof GenresKorean)[]
): Promise<getCount.Output> => {
  const queryParams = new URLSearchParams({
    genre: genres.length > 0 ? genres.join(",") : "ALL",
  });
  const res = await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${
      getCount.METADATA.path
    }?${queryParams.toString()}`,
    {
      method: getCount.METADATA.method,
    }
  );
  return await res.json();
};

export const getGameListCall = async ({
  genres,
  order,
  page,
}: GetGameListCallProps): Promise<getList.Output> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: GAME_LIST_LIMIT.toString(),
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
    limit: "10",
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
