import { GenresKorean } from "@/common/Game/Genre";
import { create } from "zustand";

interface EndedGameFilterStore {
  selectedGenres: (keyof typeof GenresKorean)[];
  setStoreSelectedGenres: (genres: (keyof typeof GenresKorean)[]) => void;
}

export const useEndedGameFilterStore = create<EndedGameFilterStore>((set) => ({
  selectedGenres: [],
  setStoreSelectedGenres: (genres: (keyof typeof GenresKorean)[]) => {
    set({ selectedGenres: genres });
  },
}));
