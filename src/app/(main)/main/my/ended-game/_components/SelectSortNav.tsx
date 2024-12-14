import React from "react";

interface SelectSortNavProps {
  selectedSort:
    | {
        key: "DATE";
        value: "날짜별";
      }
    | {
        key: "GAME";
        value: "게임별";
      };
  handleSortChange: (sort: "DATE" | "GAME") => void;
}

export default function SelectSortNav({
  selectedSort,
  handleSortChange,
}: SelectSortNavProps) {
  const sortKey = [
    { key: "DATE", value: "날짜별" },
    { key: "GAME", value: "게임별" },
  ];

  const selectedComponent = () => {
    return sortKey.map((key) => {
      return (
        <div
          key={key.key}
          className={`w-[85px] h-[34px]  rounded-[8px] text-center
            flex items-center justify-center m-[2px] ${
              selectedSort.key === key.key ? "bg-gray-50" : "bg-gray-800"
            }`}
          onClick={() => handleSortChange(key.key as "DATE" | "GAME")}
        >
          <span className="headline-sb text-black">{key.value}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-[174px] h-[38px] bg-gray-800 rounded-[8px] flex justify-between items-center">
        {selectedComponent()}
      </div>
    </div>
  );
}
