import { create } from "zustand";

interface CommonStore {
  isModalOrBottomSheetOpen: boolean;
  setIsModalOrBottomSheetOpen: (isOpen: boolean) => void;
}

export const useCommonStore = create<CommonStore>((set) => ({
  isModalOrBottomSheetOpen: false,
  setIsModalOrBottomSheetOpen: (isOpen: boolean) =>
    set({ isModalOrBottomSheetOpen: isOpen }),
}));
