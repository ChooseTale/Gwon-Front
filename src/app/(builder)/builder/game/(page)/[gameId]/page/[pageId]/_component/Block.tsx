"use client";

import ContextMenu from "@/common/ContextMenu";
import Svg from "@/common/Svg";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { colors } from "../../../../../../../../../../tailwind.config";

interface BlockProps {
  originalText: string;
  isActive: boolean;
  handleCancel: () => void;
  handleComplete: (text: string) => void;
  handleDelete: () => void;
  clickBlock: () => void;
  longPress: () => void;
  isOpacity50: boolean;
  isModal: boolean;
}

export default function Block({
  originalText,
  isActive,
  isOpacity50,
  handleCancel,
  handleComplete,
  handleDelete,
  clickBlock,
  longPress,
  isModal,
}: BlockProps) {
  const [editedText, setEditedText] = useState(originalText);
  const [pressTimeout, setPressTimeout] = useState<number>(0);
  const blockRef = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const boxHeight = useCallback(() => {
    return textArea.current?.scrollHeight;
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const startPress = () => {
    setPressTimeout(Date.now());
  };

  const endPress = () => {
    const currentTime = Date.now();

    if (currentTime - pressTimeout > 500) {
      longPress();
    } else {
      clickBlock();
    }
    setPressTimeout(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    startPress();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    endPress();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    startPress();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    endPress();
  };

  useEffect(() => {
    setEditedText(originalText);
  }, [originalText]);

  if (!isActive) {
    return (
      <div
        ref={blockRef}
        className={`flex w-full h-full flex-col gap-0.5 ${
          isOpacity50 ? "" : "opacity-50"
        }`}
        id="block-container"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        // onMouseLeave={endPress} // 마우스를 이동했을 때도 타이머 취소
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`flex w-full  body-md `}
          style={{
            height: `${boxHeight()}px`,
            whiteSpace: "pre-wrap", // 줄바꿈과 공백을 유지
            overflowWrap: "break-word",
          }}
        >
          <textarea
            className="flex w-full  body-md overflow-hidden"
            value={editedText}
            onChange={handleTextChange}
            ref={textArea}
            style={{ height: `${boxHeight()}px` }}
            readOnly
          />
        </div>
        {/* <터치> */}
        <div className="flex caption-rg text-gray-300">&lt;터치&gt;</div>
      </div>
    );
  }

  if (isActive && isModal) {
    const childrens: {
      text: string;
      textColor?: keyof typeof colors;
      Svg: React.ReactNode;
      onClick: () => void;
    }[] = [
      {
        text: "삭제",
        textColor: "system-red",
        Svg: (
          <Svg
            icon="trashIcon"
            options={{ size: { width: 24, height: 24 }, color: "system-red" }}
          />
        ),
        onClick: () => {
          handleDelete();
        },
      },
    ];

    return (
      <div
        className={`  flex w-full h-full flex-col gap-0.5 ${
          isOpacity50 ? "" : "opacity-50"
        } `}
        id="block-container"
      >
        <div
          className={`flex w-full  body-md `}
          style={{
            height: `${boxHeight()}px`,
            whiteSpace: "pre-wrap", // 줄바꿈과 공백을 유지
            overflowWrap: "break-word",
          }}
        >
          <textarea
            className="flex w-full  body-md overflow-hidden"
            value={editedText}
            onChange={handleTextChange}
            ref={textArea}
            style={{ height: `${boxHeight()}px` }}
          />
        </div>
        <div className={`absolute right-0 bottom-[-48px]  z-20 `}>
          <ContextMenu childrens={childrens} />
        </div>
        {/* <터치> */}
        <div className="flex caption-rg text-gray-300">&lt;터치&gt;</div>
      </div>
    );
  }

  if (isActive) {
    return (
      <div
        id="block-container"
        className="flex w-full flex-col gap-0.5"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <textarea
          className="flex w-full  body-md overflow-hidden"
          value={editedText}
          onChange={handleTextChange}
          ref={textArea}
          style={{ height: `${boxHeight()}px` }}
        />
        <div className="flex w-full justify-end gap-3 z-10">
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
