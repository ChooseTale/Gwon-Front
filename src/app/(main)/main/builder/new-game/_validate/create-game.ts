export const titleValidate = (title: string) => {
  if (title.length < 1) {
    throw new Error("제목은 1자 이상이어야 합니다.");
  }
};

export const descriptionValidate = (description: string) => {
  if (description.length < 1) {
    throw new Error("설명은 1자 이상이어야 합니다.");
  }
};

export const thumbnailValidate = (thumbnail: File[]) => {
  if (thumbnail.length < 1) {
    throw new Error("썸네일은 1장 이상이어야 합니다.");
  }
};
