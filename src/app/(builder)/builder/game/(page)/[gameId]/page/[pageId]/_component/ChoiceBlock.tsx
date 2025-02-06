"use client";

import ContextMenu from "@/common/ContextMenu";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../../../../../../../../../../tailwind.config";
import Svg from "@/common/Svg";
import { deleteChoiceCall } from "@/(actions)/builder/choice/choice";
import { useParams } from "next/navigation";

interface ChoiceBlockProps {
  choiceId: number;
  order: number;
  originalText: string;
  isActive: boolean;
  isModal: boolean;
  handleCancel: () => void;
  handleComplete: (text: string) => void;
  isOpacity50: boolean;
  clickBlock: () => void;
  longPress: () => void;
  handleLinkPage: (choiceId: number) => void;
  handleDelete: () => void;
}

export default function ChoiceBlock({
  choiceId,
  order,
  originalText,
  isOpacity50,
  isActive,
  isModal,
  handleCancel,
  handleComplete,
  clickBlock,
  longPress,
  handleLinkPage,
  handleDelete,
}: ChoiceBlockProps) {
  const [editedText, setEditedText] = useState(originalText);
  const [pressTimeout, setPressTimeout] = useState<number>(0);
  const boxHeight = useCallback(() => {
    const lines = editedText.split("\n");
    return lines.length * 20;
  }, [editedText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const startPress = () => {
    setPressTimeout(Date.now());
  };

  const endPress = () => {
    const currentTime = Date.now();

    if (currentTime - pressTimeout > 300) {
      longPress();
    } else {
      clickBlock();
    }
    setPressTimeout(0);
  };

  const handleMouseDown = () => {
    startPress();
  };

  const handleMouseUp = () => {
    endPress();
  };

  const handleTouchStart = () => {
    startPress();
  };

  const handleTouchEnd = () => {
    endPress();
  };

  useEffect(() => {
    setEditedText(originalText);
  }, [originalText]);

  if (isModal) {
    const childrens: {
      text: string;
      textColor?: keyof typeof colors;
      Svg: React.ReactNode;
      onClick: () => void;
    }[] = [
      {
        text: "페이지 연결",
        textColor: "black",
        Svg: (
          <Svg
            icon="linkIcon"
            options={{ size: { width: 24, height: 24 }, color: "black" }}
          />
        ),
        onClick: () => {
          handleLinkPage(choiceId);
        },
      },
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
    const bottom = (childrens.length * 44 + 4) * -1;
    return (
      <>
        <div
          className={`flex w-full h-full flex-col gap-2 ${
            isOpacity50 ? "" : "opacity-50"
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex caption-sb text-green-400">선택지{order}</div>
          <div
            className="flex w-full h-full body-md text-white"
            style={{ height: `${boxHeight()}px` }}
          >
            {originalText}
          </div>
        </div>
        <div
          className={`absolute right-0  z-20 `}
          style={{
            bottom: `${bottom}px`,
          }}
        >
          <ContextMenu childrens={childrens} />
        </div>
      </>
    );
  }
  if (!isActive) {
    return (
      <div
        className={`flex w-full h-full flex-col gap-2 ${
          isOpacity50 ? "" : "opacity-50"
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
