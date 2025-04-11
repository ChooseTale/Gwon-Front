"use server";

import {
  create,
  update,
  $delete,
} from "@choosetale/nestia-type/lib/functional/game/choice";
import { fetchIncetance } from "../../fetch";
import { publish } from "@choosetale/nestia-type/lib/functional/game";

export const publishGameCall = async (gameId: number) => {
  try {
    await fetchIncetance(
      `${process.env.NEXT_PUBLIC_BACKEND_API}${publish.path(gameId)}`,
      { method: publish.METADATA.method }
    );
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "게임 게시에 실패했습니다.",
    };
  }
};

export const createChoiceCall = async (gameId: number, body: create.Input) => {
  await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${create.path(gameId)}`,
    {
      method: create.METADATA.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
};

export const updateChoiceCall = async (
  gameId: number,
  choiceId: number,
  body: update.Input
) => {
  try {
    await fetchIncetance(
      `${process.env.NEXT_PUBLIC_BACKEND_API}${update.path(gameId, choiceId)}`,
      {
        method: update.METADATA.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteChoiceCall = async (gameId: number, choiceId: number) => {
  await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${$delete.path(gameId, choiceId)}`,
    { method: $delete.METADATA.method }
  );
};
