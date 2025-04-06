"use client";

import React, { useEffect, useState } from "react";
import Svg from "@/common/Svg";
import ChoiceEditBottomSheet from "./BottomSheet/ChoiceEditBottomSheet";

interface ChoiceBlockProps {
  choiceId: number;
  order: number;
  originalText: string;
  isActive: boolean;

  nextPageId: number | null;
  handleCancel: () => void;
  handleComplete: (text: string, nextPageId: number) => void;

  clickBlock: () => void;
  isSheetOpen: boolean;

  handleDelete: () => void;

  linkPageData: {
    pageList: {
      id: number;
      title: string;
    }[];
    linkedPageId: number | null;
    handleChangePage: (pageId: number) => void;
  };
}

export default function ChoiceBlock({
  order,
  originalText,
  isActive,
  isSheetOpen,
  nextPageId,
  linkPageData,
  handleCancel,
  handleComplete,
  clickBlock,
  handleDelete,
}: ChoiceBlockProps) {
  const [editedText, setEditedText] = useState(originalText);

  const [isEditBottomSheetOpen, setIsEditBottomSheetOpen] =
    useState(isSheetOpen);

  useEffect(() => {
    setEditedText(originalText);
  }, [originalText]);

  const choiceHandleComplete = (text: string, nextPageId: number) => {
    handleComplete(text, nextPageId);
    setIsEditBottomSheetOpen(false);
  };

  if (!isActive) {
    return (
      <div className={`flex w-full h-full flex-col gap-2`} onClick={clickBlock}>
        <div className="flex caption-sb text-green-400">
          선택지{order}
          {nextPageId ? (
            <Svg
              icon="linkIcon"
              options={{
                size: { width: 18, height: 18 },
                color: "green-500",
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <div
          className="flex w-full text-white  body-md overflow-hidden min-h-[40px]"
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
      </div>
    );
  }
  if (isActive) {
    return (
      <>
        {isEditBottomSheetOpen && (
          <ChoiceEditBottomSheet
            isOpen={isEditBottomSheetOpen}
            onOpenChange={setIsEditBottomSheetOpen}
            originalText={editedText}
            linkedPageId={nextPageId}
            pageList={linkPageData.pageList}
            handleComplete={choiceHandleComplete}
          />
        )}
        <div className="flex  w-full h-full flex-col gap-2">
          <div className="flex caption-sb text-green-400">
            선택지{order}
            {nextPageId ? (
              <Svg
                icon="linkIcon"
                options={{
                  size: { width: 18, height: 18 },
                  color: "green-500",
                }}
              />
            ) : (
              <></>
            )}
          </div>

          <div
            className="flex w-full text-white  body-md overflow-hidden min-h-[40px]"
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
                options={{
                  size: { width: 24, height: 24 },
                  color: "green-500",
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
