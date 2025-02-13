import Svg from "@/common/Svg";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface PlayGameProps {
  game: {
    id: number;
    title: string;
  };
  page: {
    id: number;
    title: string;
    backgroundImage: {
      url: string;
    };
    isEnding: boolean;
    endingOnClick: () => void;
    contents: { content: string }[];
    choices: {
      id: number;
      title: string;
      onClick: () => void;
    }[];
  };
}

export default function PlayGame({ page }: PlayGameProps) {
  const [currentContentIdx, setCurrentContentIdx] = useState<number>(-1);
  const [animateText, setAnimateText] = useState<string>("");

  const contentRef = useRef<HTMLDivElement>(null);

  const handleContentClick = async () => {
    if (
      currentContentIdx < page.contents.length - 1 &&
      animateText.length === 0
    ) {
      const nextContent = page.contents[currentContentIdx + 1].content;
      for (let i = 0; i < nextContent.length; i++) {
        setAnimateText(nextContent.slice(0, i + 1));
        await new Promise((resolve) => setTimeout(resolve, 10));
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      }
    }
  };

  useEffect(() => {
    const updateCurrentContentIdx = () => {
      if (currentContentIdx < page.contents.length - 1) {
        if (
          animateText.length ===
          page.contents[currentContentIdx + 1].content.length
        ) {
          setCurrentContentIdx(currentContentIdx + 1);
          setAnimateText("");
        }
      }
    };
    updateCurrentContentIdx();
  }, [animateText, currentContentIdx, page.contents]);

  useEffect(() => {
    setCurrentContentIdx(-1);
    setAnimateText("");
  }, [page]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* backgroundImage부분 */}
      {page.backgroundImage.url ? (
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-black opacity-25">
          <Image
            src={page.backgroundImage.url}
            alt={page.title}
            fill
            className="object-cover w-full"
          />
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-black opacity-25">
          <div className="absolute top-0 left-0 w-full h-full z-0 bg-white"></div>
        </div>
      )}
      <div
        className="flex flex-col   h-full z-10 ml-[20px] mr-[20px]"
        onClick={handleContentClick}
      >
        {/* content부분 */}
        <div
          className="flex w-full flex-col  h-full z-10 overflow-y-auto "
          ref={contentRef}
        >
          {page.contents
            .slice(0, currentContentIdx + 1)
            .map((content, index) => (
              <div key={index} className="flex p-3 text-headline-md text-white">
                {content.content}
              </div>
            ))}
          <div className="flex p-3 text-headline-md text-white">
            {animateText}
          </div>
        </div>

        {/* choice부분 */}
        {currentContentIdx === page.contents.length - 1 && (
          <>
            {page.isEnding ? (
              <div className="flex w-full  flex-col items-center justify-center h-fit mb-[40px] z-10 gap-3">
                <div className="flex flex-row w-full gap-2">
                  <div
                    className="flex w-full h-[48px] bg-green-500 rounded-[6px]
                  justify-center items-center
                  text-headline-md text-black  "
                    onClick={page.endingOnClick}
                  >
                    엔딩 보러가기
                    <Svg
                      icon="chevronRightIcon"
                      options={{
                        size: { width: 24, height: 24 },
                        color: "black",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full  flex-col items-center justify-center h-fit mb-[40px] z-10 gap-3">
                {page.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-full h-[48px] bg-gray-900 rounded-[6px] text-headline-md text-gray-100 border border-black"
                    onClick={choice.onClick}
                  >
                    {choice.title}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
