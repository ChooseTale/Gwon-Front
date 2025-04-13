"use server";

import { updatePageCall } from "@/(actions)/builder/page/page";

interface SavePageProps {
  gameId: number;
  page: {
    id: number;
    title: string;
    backgroundImage: File | null;
    contents: {
      content: string;
    }[];
    isEnding: boolean;
  };
  choices: {
    id: number;
    text: string;
    nextPageId: number | null;
  }[];
}

export default async function SavePage({
  gameId,
  page,
  choices,
}: SavePageProps) {
  try {
    await updatePageCall(
      gameId,
      page.id,
      {
        title: page.title,
        contents: page.contents,
        isEnding: page.isEnding,
        choices: choices.map((choice) => ({
          id: choice.id,
          title: choice.text,
          childPageId: choice.nextPageId == 0 ? null : choice.nextPageId,
        })),
      },
      page.backgroundImage?.name == "backgroundImage"
        ? null
        : page.backgroundImage
    );
  } catch (error: any) {
    throw error;
  }
}
