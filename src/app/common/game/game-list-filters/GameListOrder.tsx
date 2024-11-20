"use client";
import type { GameListOption } from "@/interface/customType";
import { type FormattedSearchParams } from "@/utils/formatGameListSearchParams";

interface GameListSelectProps {
  searchParams: FormattedSearchParams;
  handleOrderChange: (newOder: string) => void;
  option: GameListOption;
}

export default function GameListOrder({
  searchParams,
  handleOrderChange,
  option,
}: GameListSelectProps) {
  const defaultOrder = searchParams.order;

  const orderId = "orderSelect";
  const orders = option.orders.map((e) => ({
    value: e.value,
    optionLabel: e.optionLabel,
  }));

  return (
    <select
      id={orderId}
      value={searchParams.order || defaultOrder}
      onChange={(e) => handleOrderChange(e.target.value)}
      className="bg-transparent body pl-2 pr-1 h-full"
    >
      {orders.map(({ value, optionLabel }) => (
        <option key={value} value={value}>
          {optionLabel}
        </option>
      ))}
    </select>
  );
}
