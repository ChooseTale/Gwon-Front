import { GenresKorean } from "@/common/Game/Genre";
import { create } from "zustand";

interface BuilderGameFilterStore {
  selectedGenres: (keyof typeof GenresKorean)[];
  setStoreSelectedGenres: (genres: (keyof typeof GenresKorean)[]) => void;
}

export const useBuilderGameFilterStore = create<BuilderGameFilterStore>(
  (set) => ({
    selectedGenres: [],
    setStoreSelectedGenres: (genres: (keyof typeof GenresKorean)[]) => {
      set({ selectedGenres: genres });
    },
  })
);
