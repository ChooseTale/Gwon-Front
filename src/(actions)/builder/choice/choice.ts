import {
  create,
  update,
} from "@choosetale/nestia-type/lib/functional/game/choice";
import { fetchIncetance } from "../../fetch";

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
  await fetchIncetance(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${update.path(gameId, choiceId)}`,
    {
      method: update.METADATA.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
};
