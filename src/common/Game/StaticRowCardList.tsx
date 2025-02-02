"use server";
import React from "react";

import { getStaticGameListCall } from "@/(actions)/main/game";
import { GenresKorean } from "./Genre";
import RowCardList from "./RowCardList/RowCardList";

export default async function RowCardListStatic({
  title,
  gameFilterOptions,
}: {
  title: string;
  gameFilterOptions: { genres: (keyof typeof GenresKorean)[] };
}) {
  const cards = await getStaticGameListCall({
    genres: gameFilterOptions.genres,
    order: "POPULAR",
    revalidateOption: {
      time: 3600,
    },
  });

  return <RowCardList title={title} cards={cards} />;
}
