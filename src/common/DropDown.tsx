import React from "react";

interface DropDownProps {
  values: {
    key: string;
    value: string;
  }[];
  onChange: (key: string, value: string) => void;
}

export default function DropDown({ values, onChange }: DropDownProps) {
  return (
    <div
      className="
      border-[1px] border-gray-700
      w-[116px] rounded-[6px] bg-gray-800
    flex absolute  justify-center items-center flex-col
    py-1
    "
    >
      {values.map((value) => (
        <div
          onClick={() => onChange(value.key, value.value)}
          key={value.key}
          className="w-[100px] h-[36px] body-md text-white flex justify-center items-center"
        >
          {value.value}
        </div>
      ))}
    </div>
  );
}
