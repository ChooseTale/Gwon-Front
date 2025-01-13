"use client";

import React, { useState } from "react";

interface BlockProps {
  text: string;
  isActive: boolean;
  handleCancel: () => void;
  handleComplete: () => void;
  clickBlock: () => void;
}

export default function Block({
  text,
  isActive,
  handleCancel,
  handleComplete,
  clickBlock,
}: BlockProps) {
  const [editedText, setEditedText] = useState(text);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  if (!isActive) {
    return (
      <div
        className="flex w-full h-full flex-col gap-0.5 "
        onClick={clickBlock}
      >
        <div className="flex w-full h-full body-md">{text}</div>
        {/* <터치> */}
        <div className="flex  caption-rg text-gray-300">&lt;터치&gt;</div>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="flex w-full h-full flex-col gap-0.5 ">
        <textarea
          className="flex w-full h-full body-md"
          value={editedText}
          onChange={handleTextChange}
          autoFocus
        />
        <div className="flex w-full  justify-end gap-3">
          <p className="flex text-gray-400" onClick={handleCancel}>
            취소
          </p>
          <p className="flex text-green-500" onClick={handleComplete}>
            완료
          </p>
        </div>
      </div>
    );
  }
}
