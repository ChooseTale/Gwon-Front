"use client";
import Dropdown_dark from "@/common/Dropdown_dark";
import Svg from "@/common/Svg";

import { useCommonStore } from "@/store/common.store";
import React, { useEffect, useState } from "react";

interface LinkPageBottomSheetProps {
  pageList: {
    id: number;
    title: string;
  }[];
  page: {
    id: number;
    title: string;
  };
  linkedPageId: number | null;
  handleChangePage: (pageId: number) => void;
  handleClose: () => void;
}

export default function LinkPageBottomSheet({
  pageList,
  page,
  linkedPageId,
  handleChangePage,
  handleClose,
}: LinkPageBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    useCommonStore.getState().setIsModalOrBottomSheetOpen(true);
    new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
      setIsOpen(true);
    });
  }, []);

  return (
    <div
      className="fixed flex inset-0  justify-center items-center bg-black bg-opacity-50 z-30"
      onClick={() => {
        useCommonStore.getState().setIsModalOrBottomSheetOpen(false);
        handleClose();
      }}
    >
      <div className="flex  w-full h-full  flex-col justify-center items-center relative">
        <div
          className={`flex flex-col absolute w-full min-w-[320px] max-w-[400px]
            h-[600px]
             bottom-0
        z-20
         bg-white  rounded-t-[20px] shadow-lg
        overflow-y-auto
         overflow-x-hidden
  ${
    isOpen ? "translate-y-0 " : "translate-y-[100%]"
  } transition-transform duration-300
        `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center items-center headline-md h-[48px]">
            페이지 연결
          </div>
          {/* 닫기 버튼 */}
          {/* <div
            className="absolute flex justify-center items-center rounded-full
                      bg-gray-900
              top-3 right-3  w-[28px] h-[28px]"
          >
            <button
              onClick={() => {
                useCommonStore.getState().setIsModalOrBottomSheetOpen(false);
                handleClose();
              }}
              className=" text-gray-500 "
            >
              <Svg
                icon="xIcon"
                options={{
                  size: { width: 24, height: 24 },
                  color: "gray-700",
                }}
              />
            </button>
          </div> */}
          <div className="flex  mt-[20px] ml-[20px] mr-[20px]  justify-center items-center mb-4 ">
            <div className="flex flex-col w-full  bg-gray-10 rounded-[8px]">
              <div className="flex flex-col p-[12px]">
                <div className="flex caption-md text-green-500">
                  현재 페이지명
                </div>
                <div className="flex headline-md text-black">{page.title}</div>
              </div>
            </div>
          </div>
          {/* arrow */}
          <div className="flex justify-center items-center">
            <div className=""></div>
          </div>
          <Svg
            icon="arrowIcon"
            options={{
              size: { width: 16, height: 29 },
              color: "gray-600",
            }}
          />
          {/* 연결될 페이지 */}
          <div className="ml-[20px] mr-[20px] z-10">
            <Dropdown_dark
              titleData={{
                title: "연결될 페이지",
                required: false,
                textColor: "black",
              }}
              bottomSheetData={{
                textColor: "black",
                bgColor: "white",
                borderColor: "gray-100",
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

          {/* 완료 버튼 */}
          <div
            className="flex absolute bottom-[32px] left-[12px] right-[12px] w-full min-w-[296px] max-w-[376px]
           justify-center items-center"
          >
            <button
              className="flex w-full justify-center items-center h-[48px]  bg-green-500 text-white title2-md rounded-[6px]"
              onClick={() => {
                if (currentPage) {
                  handleChangePage(currentPage.id);
                  handleClose();
                }
              }}
              role="button"
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
