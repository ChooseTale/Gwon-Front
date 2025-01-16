"use client";

import React, { useState, useRef, useEffect } from "react";

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이를 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이에 맞게 재조정
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
    adjustTextareaHeight();
  };

  // 컴포넌트가 마운트될 때 초기 높이를 조정
  useEffect(() => {
    adjustTextareaHeight();
  }, [isActive]);

  if (!isActive) {
    return (
      <div className="flex w-full h-full flex-col gap-0.5" onClick={clickBlock}>
        <div
          className={`flex w-full h-[${textareaRef.current?.scrollHeight}px] body-md`}
          style={{
            height: `${textareaRef.current?.scrollHeight}px`,
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
      <div className={`flex w-full flex-col gap-0.5`}>
        <textarea
          ref={textareaRef}
          className="flex w-full  body-md"
          value={editedText}
          onChange={handleTextChange}
          style={{ height: `${textareaRef.current?.scrollHeight}px` }}
        />
        <div className="flex w-full justify-end gap-3">
          <p
            className="flex text-gray-400"
            onClick={() => {
              setEditedText(text);
              handleCancel();
            }}
          >
            취소
          </p>
          <p className="flex text-green-500" onClick={handleComplete}>
            완료
          </p>
        </div>
      </div>
    );
  }

  return null;
}
