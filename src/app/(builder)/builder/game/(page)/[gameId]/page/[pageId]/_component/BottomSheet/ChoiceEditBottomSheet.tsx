"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Svg from "@/common/Svg";
import Dropdown_dark from "@/common/Dropdown_dark";

interface ChoiceEditBottomSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  originalText: string;
  linkedPageId: number | null;
  pageList: {
    id: number;
    title: string;
  }[];
  handleComplete: (text: string, pageId: number) => void;
}
export default function ChoiceEditBottomSheet({
  isOpen,
  onOpenChange,
  originalText,
  linkedPageId,
  pageList,
  handleComplete,
}: ChoiceEditBottomSheetProps) {
  const [editedText, setEditedText] = useState(originalText);

  const [currentPage, setCurrentPage] = useState<{
    id: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (linkedPageId) {
      setCurrentPage({
        id: linkedPageId,
        title: pageList.find((page) => page.id === linkedPageId)?.title || "",
      });
    }
  }, [linkedPageId, pageList]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex flex-col bg-gray-900 w-full min-w-[320px] max-w-[400px] h-[calc(100%-60px)]
         rounded-t-[20px] shadow-lg  justify-self-center border-none "
        onCloseAutoFocus={() => {
          onOpenChange(false);
        }}
      >
        <SheetTitle />
        <div className="h-full">
          {/* 헤더 */}
          <div className="flex flex-row justify-between items-end min-h-[48px]">
            <div
              className="flex flex-row ml-[20px] mb-[4px]"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              <Svg
                icon="xIcon"
                options={{ size: { width: 24, height: 24 }, color: "gray-100" }}
              />
            </div>
            <div
              className="flex flex-row mr-[20px] mb-[4px]"
              onClick={() => {
                handleComplete(editedText, currentPage?.id || 0);
              }}
            >
              <Svg
                icon="checkIcon"
                options={{
                  size: { width: 24, height: 24 },
                  color: "green-500",
                }}
              />
            </div>
          </div>
          {/* 선택지 내용 */}
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex flex-col ">
              <div className="flex mt-4 ml-[20px] mr-[20px] headline-sb text-white">
                선택지 내용
              </div>
              <div className="flex min-h-[220px]  ml-[20px] mr-[20px] mt-3 border-[1px] border-gray-800 rounded-[8px]">
                <textarea
                  className="flex body-md w-full mx-4 my-4  resize-none bg-gray-900 text-white"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  placeholder={`이건 블럭이에요.
게임을 할 때 터치 한번에 노출될 글을 한 블럭에 적으면 돼요.`}
                  maxLength={20}
                />
              </div>
            </div>
            <div className="ml-[20px] mr-[20px] z-10 mt-[40px]">
              <Dropdown_dark
                titleData={{
                  title: "연결할 페이지",
                  required: false,
                  textColor: "white",
                }}
                bottomSheetData={{
                  textColor: "white",
                  bgColor: "gray-900",
                  borderColor: "gray-800",
                }}
                currentValue={currentPage?.title || ""}
                values={pageList.map((page) => ({
                  key: page.id.toString(),
                  value: page.title,
                }))}
                onChange={(key) => {
                  setCurrentPage({
                    id: Number(key),
                    title:
                      pageList.find((page) => page.id === Number(key))?.title ||
                      "",
                  });
                }}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
