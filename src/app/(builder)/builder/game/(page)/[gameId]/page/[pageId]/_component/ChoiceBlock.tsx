"use client";

import React, { useCallback, useEffect, useState } from "react";

interface ChoiceBlockProps {
  order: number;
  originalText: string;
  handleClick: () => void;
  isActive: boolean;
  handleCancel: () => void;
  handleComplete: (text: string) => void;
  isOpacity50: boolean;
}

export default function ChoiceBlock({
  order,
  originalText,
  isOpacity50,
  handleClick,
  isActive,
  handleCancel,
  handleComplete,
}: ChoiceBlockProps) {
  const [editedText, setEditedText] = useState(originalText);
  const boxHeight = useCallback(() => {
    const lines = editedText.split("\n");
    return lines.length * 20;
  }, [editedText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  useEffect(() => {
    setEditedText(originalText);
  }, [originalText]);

  if (!isActive) {
    return (
      <div
        className={`flex w-full h-full flex-col gap-2 ${
          isOpacity50 ? "" : "opacity-50"
        }`}
        onClick={handleClick}
      >
        <div className="flex caption-sb text-green-400">선택지{order}</div>
        <div
          className="flex w-full h-full body-md text-white"
          style={{ height: `${boxHeight()}px` }}
        >
          {originalText}
        </div>
      </div>
    );
  }
  if (isActive) {
    return (
      <div className="flex w-full h-full flex-col gap-2">
        <div className="flex caption-sb text-green-400">선택지{order}</div>
        <textarea
          className="flex w-full h-full body-md text-white overflow-hidden bg-gray-800"
          value={editedText}
          onChange={handleTextChange}
          style={{ height: `${boxHeight()}px` }}
        />
        <div className="flex w-full justify-end gap-3">
          <p
            className="flex text-gray-400"
            onClick={() => {
              setEditedText(originalText);
              handleCancel();
            }}
          >
            취소
          </p>
          <p
            className="flex text-green-500"
            onClick={() => {
              handleComplete(editedText);
            }}
          >
            완료
          </p>
        </div>
      </div>
    );
  }
}
