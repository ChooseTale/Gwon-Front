import { GenresKorean } from "@/common/Game/Genre";
import { create } from "zustand";

interface GameFilterStore {
  selectedGenres: (keyof typeof GenresKorean)[];
  setStoreSelectedGenres: (genres: (keyof typeof GenresKorean)[]) => void;
}

export const useGameFilterStore = create<GameFilterStore>((set) => ({
  selectedGenres: [],
  setStoreSelectedGenres: (genres: (keyof typeof GenresKorean)[]) => {
    set({ selectedGenres: genres });
  },
}));
