"use server";

import { cookies } from "next/headers";
import { getList } from "@choosetale/nestia-type/lib/functional/game_play/list/index";

export const getGameListCall = async (): Promise<getList.Output> => {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("connect.sid");

  const queryParams = new URLSearchParams({
    page: "1",
    limit: "10",
    order: "LATEST",
    genre: "ALL",
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${
      getList.METADATA.path
    }?${queryParams.toString()}`,
    {
      headers: {
        Cookie: `connect.sid=${myCookie?.value}`,
      },
    }
  );

  return await res.json();
};
