import { create } from "zustand";

export const useEndedGameOrderStore = create<{
  selectedOrderKey: "LATEST" | "OLDEST";
  selectedOrderValue: string;
  setSelectedOrder: (order: {
    key: "LATEST" | "OLDEST";
    value: string;
  }) => void;
}>((set) => ({
  selectedOrderKey: "LATEST",
  selectedOrderValue: "최신순",
  setSelectedOrder: (order) =>
    set((state) => {
      return {
        selectedOrderKey: order.key,
        selectedOrderValue: order.value,
      };
    }),
}));
