"use client";

import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import BuilderGamePageTopNav from "./_component/TopNav";
import PageTitle from "./_component/PageTitle";
import BottomSheet from "./_component/BottomSheet";
import { getPage } from "@choosetale/nestia-type/lib/functional/game/page/index";
import { getPageCall } from "@/app/(actions)/builder/page/page";
import Block from "./_component/Block";
import ChoiceBlock from "./_component/ChoiceBlock";
import Image from "next/image";
import SavePage from "./_component/TopNav/SavePage";

export default function BuilderGamePage() {
  const { gameId, pageId } = useParams();

  const [page, setPage] = useState<getPage.Output | null>(null);
  const [activeBlock, setActiveBlock] = useState<{
    idx: number;
    type: "block" | "choice";
    isHighlight: boolean; // 다른 블럭들의 opacity를 줄이고 현재 블럭을 하이라이팅
  } | null>(null);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(true);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

  useEffect(() => {
    const convertUrlToFile = async (url: string) => {
      const response = await fetch(url);
      const data = await response.blob();
      const file = new File([data], "backgroundImage", { type: data.type });
      setBackgroundImage(file);
    };

    if (page?.backgroundImage.url) {
      convertUrlToFile(page.backgroundImage.url);
    }
  }, [page?.backgroundImage]);

  const isActiveBlock = useCallback(
    (idx: number) => {
      return activeBlock?.idx === idx && activeBlock?.type === "block";
    },
    [activeBlock]
  );

  useEffect(() => {
    const fetchPage = async () => {
      const res = await getPageCall(Number(gameId), Number(pageId));
      setPage(res);
    };
    fetchPage();
  }, [gameId, pageId]);

  if (!page) return <div>Loading...</div>;

  const handleBottomSheetClick = (
    key: "block" | "choice" | "aiChoice" | "background"
  ) => {
    switch (key) {
      case "block":
        const block = page.contents;
        // activeBlockIdx가 있다면 해당 블럭의 바로 뒤에 생성
        if (activeBlock !== null) {
          block.splice(activeBlock.idx + 1, 0, {
            content: "",
          });
        } else if (activeBlock === null) {
          // 마지막 블럭 뒤에 생성
          block.push({
            content: "",
          });
        }

        setPage({
          ...page,
          contents: block,
        });
        break;
      case "choice":
        const choice = page.choices;
        if (choice.length >= 4) {
          alert("선택지는 최대 4개까지 생성할 수 있습니다.");
          return;
        }
        choice.push({
          id: -1,
          text: "",
          nextPageId: null,
        });
        setPage({
          ...page,
          choices: choice,
        });
        break;
      case "aiChoice":
        break;
      case "background":
        // input type="file" 사용자에게 이미지를 받음
        const file = document.createElement("input");
        file.type = "file";
        file.accept = ".jpg, .png, .gif, .jpeg";

        file.onchange = (e) => {
          if (e.target) {
            const file = e.target.files[0];
            setBackgroundImage(file);
          }
        };
        file.click();
        break;
      default:
        throw new Error("Invalid key");
    }
  };

  const handleComplete = () => {
    SavePage({
      gameId: Number(gameId),
      page: {
        id: page.id,
        title: page.title,
        backgroundImage: backgroundImage,
        contents: page.contents,
        isEnding: page.isEnding,
      },
      choices: page.choices.map((choice) => ({
        id: choice.id,
        text: choice.text,
        nextPageId: choice.nextPageId,
      })),
    });
  };

  return (
    <div className="flex w-full h-full flex-col bg-white ">
      <div className="relative flex  bg-white ml-[20px] mr-[20px]    flex-col items-center z-10">
        <BuilderGamePageTopNav handleComplete={handleComplete} />
        <PageTitle
          title={page.title}
          setTitle={(title) => {
            setPage({
              ...page,
              title: title,
            });
          }}
        />
      </div>
      {/* 본문 */}

      <div
        id="page-content"
        className="flex w-full h-full flex-1 flex-col mt-[12px] bg-gray-10 overflow-y-auto"
        style={{}}
      >
        {backgroundImage && (
          // <div className="relative flex w-full h-full">
          <div className="fixed  justify-center items-center top-[120px]  w-full min-w-[280px] max-w-[600px] h-full z-0 ">
            <div className="relative bg-red-500 flex w-full h-full">
              <Image
                src={URL.createObjectURL(backgroundImage)}
                alt="background"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        )}
        <div className="flex ml-[20px] mr-[20px] flex-col gap-2 z-10">
          <div className="flex flex-col mt-4 gap-2">
            {page?.contents.map((content, idx) => (
              <div
                key={idx}
                id="page-content-container"
                className={`relative flex   flex-1 flex-col
           rounded-[6px] bg-white  p-3 border ${
             isActiveBlock(idx)
               ? "border-green-500 border-[2px] "
               : "border-gray-50"
           }`}
              >
                <Block
                  key={idx}
                  originalText={content.content}
                  isActive={isActiveBlock(idx)}
                  isOpacity50={
                    !activeBlock?.isHighlight ? true : idx === activeBlock?.idx
                  }
                  isModal={activeBlock?.isHighlight ?? false}
                  handleDelete={() => {
                    const newContents = page.contents.filter((_, idx) => {
                      if (idx === activeBlock?.idx) {
                        return false;
                      }
                      return true;
                    });
                    setPage({
                      ...page,
                      contents: newContents,
                    });
                    setActiveBlock(null);
                  }}
                  handleCancel={() => {
                    setActiveBlock(null);
                  }}
                  handleComplete={(text: string) => {
                    setPage({
                      ...page,
                      contents: page.contents.map((content, idx) => ({
                        ...content,
                        content:
                          idx === activeBlock?.idx ? text : content.content,
                      })),
                    });
                    setActiveBlock(null);
                  }}
                  clickBlock={() => {
                    setActiveBlock({
                      idx,
                      type: "block",
                      isHighlight: false,
                    });
                  }}
                  longPress={() => {
                    setActiveBlock({
                      idx,
                      type: "block",
                      isHighlight: true,
                    });
                  }}
                />
              </div>
            ))}
          </div>
          {/* 선택지 */}
          <div id="choice-container" className="flex flex-col gap-2">
            {page?.choices.map((choice, idx) => {
              const isActive =
                activeBlock?.idx === idx &&
                activeBlock?.type === "choice" &&
                !activeBlock.isHighlight;
              return (
                <div
                  className={`flex p-3 bg-gray-800 rounded-[6px] flex-col gap-2
                  ${isActive ? "border-green-500 border-[2px]" : ""}
                `}
                  key={idx}
                >
                  <ChoiceBlock
                    order={idx + 1}
                    originalText={choice.text}
                    handleClick={() => {
                      setActiveBlock({
                        idx,
                        type: "choice",
                        isHighlight: false,
                      });
                    }}
                    isOpacity50={
                      !activeBlock?.isHighlight
                        ? true
                        : idx === activeBlock?.idx
                    }
                    isActive={isActive}
                    handleCancel={() => {
                      setActiveBlock(null);
                    }}
                    handleComplete={(text: string) => {
                      setPage({
                        ...page,
                        choices: page.choices.map((choice, idx) => ({
                          ...choice,
                          text: idx === activeBlock?.idx ? text : choice.text,
                        })),
                      });
                      setActiveBlock(null);
                    }}
                  />
                </div>
              );
            })}
          </div>
          {/* 선택지 끝 */}
        </div>
      </div>
      {/* 본문 끝 */}

      <div className="fixed bottom-0 w-full z-10">
        <BottomSheet
          onClick={handleBottomSheetClick}
          isOpen={isBottomSheetOpen}
          handleOpen={(isOpen: boolean) => setIsBottomSheetOpen(isOpen)}
          activeType={[
            { key: "block", isActive: activeBlock?.type !== "choice" },
            { key: "choice", isActive: page.choices.length < 4 },
            { key: "aiChoice", isActive: page.choices.length < 4 },
            { key: "background", isActive: activeBlock === null },
          ]}
        />
      </div>
    </div>
  );
}
