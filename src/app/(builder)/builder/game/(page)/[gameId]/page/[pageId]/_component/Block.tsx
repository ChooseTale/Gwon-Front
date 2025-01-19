"use client";

import React, { useState, useEffect, useCallback } from "react";

interface BlockProps {
  originalText: string;
  isActive: boolean;
  handleCancel: () => void;
  handleComplete: (text: string) => void;
  clickBlock: () => void;
}

export default function Block({
  originalText,
  isActive,
  handleCancel,
  handleComplete,
  clickBlock,
}: BlockProps) {
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
      <div className="flex w-full h-full flex-col gap-0.5" onClick={clickBlock}>
        <div
          className={`flex w-full  body-md `}
          style={{
            height: `${boxHeight()}px`,
            whiteSpace: "pre-wrap", // 줄바꿈과 공백을 유지
            overflowWrap: "break-word",
          }}
        >
          {editedText}
        </div>
        {/* <터치> */}
        <div className="flex caption-rg text-gray-300">&lt;터치&gt;</div>
      </div>
    );
  }

  if (isActive) {
    return (
      <div className="flex w-full flex-col gap-0.5">
        <textarea
          className="flex w-full  body-md overflow-hidden"
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

  return null;
}
