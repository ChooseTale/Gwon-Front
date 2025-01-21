"use client";

import React from "react";
import { colors } from "../../tailwind.config";

interface ContextMenuProps {
  childrens: {
    text: string;
    textColor?: keyof typeof colors;
    Svg: React.ReactNode;
    onClick: () => void;
  }[];
}

export default function ContextMenu({ childrens }: ContextMenuProps) {
  return (
    <div className="flex w-[203px] flex-col bg-white rounded-[6px] drop-shadow-2">
      {childrens.map((child, index) => (
        <div
          className="flex w-full h-[44px] justify-between items-center"
          key={index}
          onClick={() => child.onClick()}
        >
          <div
            className={`ml-[14px] body-md ${
              child.textColor == "system-red" ? "text-system-red" : "black"
            }`}
          >
            {child.text}
          </div>
          <div className="mr-[14px]">{child.Svg}</div>
        </div>
      ))}
    </div>
  );
}
