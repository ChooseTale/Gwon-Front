"use server";

import {
  createChoiceCall,
  updateChoiceCall,
} from "@/app/(actions)/builder/choice/choice";
import { updatePageCall } from "@/app/(actions)/builder/page/page";

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

class PageValidator {
  static validate(
    page: SavePageProps["page"],
    choices: SavePageProps["choices"]
  ) {
    if (page.title.length === 0) {
      throw new Error("제목이 필요합니다.");
    }
    if (page.contents.length === 0) {
      throw new Error("페이지에 블럭은 하나 이상 있어야 합니다.");
    }
    if (choices.length === 0 && !page.isEnding) {
      throw new Error("선택지가 필요합니다.");
    }
  }
}

export default async function SavePage({
  gameId,
  page,
  choices,
}: SavePageProps) {
  try {
    PageValidator.validate(page, choices);

    await updatePageCall(gameId, page.id, page, page.backgroundImage);

    for (const choice of choices) {
      if (choice.id) {
        await updateChoiceCall(gameId, choice.id, {
          parentPageId: page.id,
          childPageId: choice.nextPageId,
          title: choice.text,
          description: "",
        });
      } else {
        await createChoiceCall(gameId, {
          parentPageId: page.id,
          childPageId: choice.nextPageId || undefined,
          title: choice.text,
          description: "",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
