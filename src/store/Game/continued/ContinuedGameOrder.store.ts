import { create } from "zustand";

export const useContinuedGameOrderStore = create<{
  selectedOrder: "LATEST" | "OLDEST";
  setSelectedOrder: (order: "LATEST" | "OLDEST") => void;
}>((set) => ({
  selectedOrder: "LATEST",
  setSelectedOrder: (order) => set({ selectedOrder: order }),
}));
