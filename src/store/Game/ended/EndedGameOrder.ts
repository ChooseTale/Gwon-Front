import { create } from "zustand";

export const useEndedGameOrderStore = create<{
  selectedOrder: "LATEST" | "OLDEST";
  setSelectedOrder: (order: "LATEST" | "OLDEST") => void;
}>((set) => ({
  selectedOrder: "LATEST",
  setSelectedOrder: (order) => set({ selectedOrder: order }),
}));
