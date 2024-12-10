import { GenresKorean } from "@/common/Game/Genre";
import { create } from "zustand";

interface ContinuedGameFilterStore {
  selectedGenres: (keyof typeof GenresKorean)[];
  setStoreSelectedGenres: (genres: (keyof typeof GenresKorean)[]) => void;
}

export const useContinuedGameFilterStore = create<ContinuedGameFilterStore>(
  (set) => ({
    selectedGenres: [],
    setStoreSelectedGenres: (genres: (keyof typeof GenresKorean)[]) => {
      set({ selectedGenres: genres });
    },
  })
);
