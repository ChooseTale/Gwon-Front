"use client";

import ContextMenu from "@/common/ContextMenu";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { colors } from "../../../../../../../../../../tailwind.config";
import Svg from "@/common/Svg";

interface ChoiceBlockProps {
  choiceId: number;
  order: number;
  originalText: string;
  isActive: boolean;
  isModal: boolean;
  nextPageId: number | null;
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
  nextPageId,
  handleCancel,
  handleComplete,
  clickBlock,
  longPress,
  handleLinkPage,
  handleDelete,
}: ChoiceBlockProps) {
  const [editedText, setEditedText] = useState(originalText);
  const [pressTimeout, setPressTimeout] = useState<number>(0);
  const [, setPressTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const boxHeight = useCallback(() => {
    const lines = editedText.split("\n");
    return lines.length * 20;
  }, [editedText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const startPress = () => {
    setPressTimeout(Date.now());
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const interval = setInterval(() => {
      setPressTime((prevTime) => {
        const newTime = prevTime + 1;
        if (newTime > 20) {
          clearInterval(interval);
          setPressTime(0);
          return 20;
        }
        return newTime;
      });
    }, 100);

    intervalRef.current = interval;
  };

  const endPress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setPressTime(0);
      intervalRef.current = null;
    }

    const currentTime = Date.now();

    if (currentTime - pressTimeout < 10) {
      return;
    }

    if (currentTime - pressTimeout > 300) {
      longPress();
    } else {
      clickBlock();
    }
    setPressTimeout(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleMouseDown = (e: any) => {
    e.stopPropagation();
    startPress();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    endPress();
  };

  const handleTouchStart = (e: any) => {
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
        className={`flex w-full h-full flex-col gap-2 ${
          isOpacity50 ? "" : "opacity-50"
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex caption-sb text-green-400">
          선택지{order}
          {nextPageId && (
            <Svg
              icon="linkIcon"
              options={{
                size: { width: 18, height: 18 },
                color: "green-500",
              }}
            />
          )}
        </div>

        <textarea
          className="flex w-full h-full body-md text-white overflow-hidden bg-gray-800"
          value={editedText}
          onChange={handleTextChange}
          style={{ height: `${boxHeight()}px` }}
        />
      </div>
    );
  }
  if (isActive) {
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

    return (
      <>
        <div
          className="flex  w-full h-full flex-col gap-2"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex caption-sb text-green-400">
            선택지{order}
            {nextPageId && (
              <Svg
                icon="linkIcon"
                options={{
                  size: { width: 18, height: 18 },
                  color: "green-500",
                }}
              />
            )}
          </div>
          <textarea
            className="flex w-full h-full body-md text-white overflow-hidden bg-gray-800"
            value={editedText}
            onChange={handleTextChange}
            style={{ height: `${boxHeight()}px` }}
          />
          <div className="flex w-full justify-end gap-3  z-10">
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
        {isModal && (
          <div id="choice-modal" className="absolute top-[110px]  right-0 z-20">
            <ContextMenu childrens={childrens} />
          </div>
        )}
      </>
    );
  }
}
