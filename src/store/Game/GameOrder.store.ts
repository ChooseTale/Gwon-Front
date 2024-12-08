import { create } from "zustand";

interface GameOrderStore {
  selectedOrder: "LATEST" | "OLDEST" | "POPULAR";
  selectedOrderValue: string;
  setStoreSelectedOrder: (
    order: "LATEST" | "OLDEST" | "POPULAR",
    value: string
  ) => void;
}

export const useGameOrderStore = create<GameOrderStore>((set) => ({
  selectedOrder: "LATEST",
  selectedOrderValue: "최신순",
  setStoreSelectedOrder: (
    order: "LATEST" | "OLDEST" | "POPULAR",
    value: string
  ) => {
    set({ selectedOrder: order, selectedOrderValue: value });
  },
}));
