"use server";

import {
  createChoiceCall,
  updateChoiceCall,
} from "@/(actions)/builder/choice/choice";
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

class PageValidator {
  static validate(
    page: SavePageProps["page"]
    // choices: SavePageProps["choices"]
  ) {
    if (page.title.length === 0) {
      throw new Error("제목이 필요합니다.");
    }
    // if (page.title.length > 30) {
    //   throw new Error("제목은 30자 이하로 작성해야 합니다.");
    // }
    if (page.contents.length === 0) {
      throw new Error("페이지에 블럭은 하나 이상 있어야 합니다.");
    }
  }
}

export default async function SavePage({
  gameId,
  page,
  choices,
}: SavePageProps) {
  try {
    PageValidator.validate(page);

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
          childPageId: choice.nextPageId,
        })),
      },
      page.backgroundImage
    );
  } catch (error: any) {
    throw error;
  }
}
