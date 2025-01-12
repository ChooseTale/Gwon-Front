import React from "react";

interface ChoiceBlockProps {
  order: number;
  text: string;
}

export default function ChoiceBlock({ order, text }: ChoiceBlockProps) {
  return (
    <div className="flex w-full h-full flex-col gap-2">
      <div className="flex caption-sb text-green-400">선택지{order}</div>
      <div className="flex w-full h-full body-md text-white">{text}</div>
    </div>
  );
}
