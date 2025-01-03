import { create } from "zustand";

export const useBuilderGameOrderStore = create<{
  selectedOrder: "LATEST" | "OLDEST";
  selectedOrderValue: string;
  setSelectedOrder: (order: "LATEST" | "OLDEST", value: string) => void;
}>((set) => ({
  selectedOrder: "LATEST",
  selectedOrderValue: "최신순",
  setSelectedOrder: (order, value) =>
    set({ selectedOrder: order, selectedOrderValue: value }),
}));
