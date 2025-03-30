"use client";

import Svg from "@/common/Svg";
import React, { useState, useEffect, useCallback, useRef } from "react";
import PageEditBottomSheet from "./BottomSheet/PageEditBottomSheet";

interface BlockProps {
  originalText: string;
  isActive: boolean;
  handleCancel: () => void;
  handleComplete: (text: string) => void;
  handleDelete: () => void;
  clickBlock: () => void;
}

export default function Block({
  originalText,
  isActive,

  handleCancel,
  handleComplete,
  handleDelete,
  clickBlock,
}: BlockProps) {
  const [editedText, setEditedText] = useState(originalText);
  const [isEditBottomSheetOpen, setIsEditBottomSheetOpen] = useState(false);

  const blockRef = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = useCallback(() => {
    if (textArea.current) {
      // 높이를 초기화하여 스크롤 높이를 정확하게 계산
      textArea.current.style.height = "auto";
      textArea.current.style.height = `${textArea.current.scrollHeight}px`;
    }
  }, []);

  const handleTextChange = (text: string) => {
    setEditedText(text);
    handleComplete(text);
  };

  useEffect(() => {
    setEditedText(originalText);
  }, [originalText]);

  // 텍스트가 변경될 때마다 높이 조정
  useEffect(() => {
    adjustTextareaHeight();
  }, [editedText, adjustTextareaHeight]);

  if (!isActive) {
    return (
      <div
        ref={blockRef}
        className={`flex w-full h-full flex-col gap-0.5`}
        id="block-container"
        onClick={clickBlock}
      >
        <div
          className={`flex w-full  body-md min-h-[40px]`}
          style={{
            whiteSpace: "pre-wrap", // 줄바꿈과 공백을 유지
            overflowWrap: "break-word",
          }}
        >
          <div>{editedText}</div>
        </div>
        {/* <터치> */}
        <div className="flex caption-rg text-gray-300">&lt;터치&gt;</div>
      </div>
    );
  }

  if (isActive) {
    return (
      <div id="block-container" className="flex w-full flex-col gap-0.5">
        {isEditBottomSheetOpen && (
          <PageEditBottomSheet
            isOpen={isEditBottomSheetOpen}
            onOpenChange={setIsEditBottomSheetOpen}
            handleTextChange={handleTextChange}
            originalText={editedText}
          />
        )}
        <div
          className="flex w-full  body-md overflow-hidden min-h-[40px]"
          style={{
            whiteSpace: "pre-wrap", // 줄바꿈과 공백을 유지
            overflowWrap: "break-word",
          }}
          onClick={(e) => {
            // 자기 자신을 클릭한 경우 active상태 변경
            if (e.target === e.currentTarget) {
              handleCancel();
            }
          }}
        >
          {editedText}
        </div>
        <div className="flex w-full justify-between gap-3 z-10">
          <div
            className="flex flex-row gap-3"
            onClick={() => {
              handleDelete();
            }}
          >
            <Svg
              icon="trashIcon"
              options={{ size: { width: 24, height: 24 }, color: "gray-500" }}
            />
          </div>
          <div
            className="flex flex-row gap-3"
            onClick={() => {
              setIsEditBottomSheetOpen(true);
            }}
          >
            <Svg
              icon="edit2Icon"
              options={{ size: { width: 24, height: 24 }, color: "green-500" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
