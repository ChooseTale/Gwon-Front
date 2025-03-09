"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import BuilderGamePageTopNav from "./_component/TopNav";
import PageTitle from "./_component/PageTitle";
import BottomSheet from "./_component/BottomSheet";
import { getPage } from "@choosetale/nestia-type/lib/functional/game/page/index";
import {
  deletePageCall,
  getAllGameCall,
  getPageCall,
} from "@/(actions)/builder/page/page";
import Block from "./_component/Block";
import ChoiceBlock from "./_component/ChoiceBlock";
import Image from "next/image";
import SavePage from "./_component/TopNav/SavePage";
import LinkPageBottomSheet from "./_component/LinkPageBottomSheet";
import { getAll } from "@choosetale/nestia-type/lib/functional/game";
import BuilderModal from "../../../../_component/modal";
import { toast } from "sonner";

import { recommendChoices } from "@/(actions)/builder/choice/chat-gpt/recommend";
import { useMeStore } from "@/store/User/Me/Me.store";
import {
  connectSocket,
  disconnectSocket,
} from "@/(actions)/socket/connect-socket";
import { NAMESPACES } from "@/(actions)/socket/socket-type";

export default function BuilderGamePage() {
  const { gameId, pageId } = useParams();
  const router = useRouter();

  const [game, setGame] = useState<getAll.Output | null>(null);

  const [page, setPage] = useState<getPage.Output | null>(null);
  const [activeBlock, setActiveBlock] = useState<{
    idx: number;
    type: "block" | "choice";
    isHighlight: boolean; // 다른 블럭들의 opacity를 줄이고 현재 블럭을 하이라이팅
  } | null>(null);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(true);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [linkPage, setLinkPage] = useState<{
    choiceId: number;
    linkedPageId: number | null;
  } | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const me = useMeStore((state) => state.me);

  const isActiveBlock = useCallback(
    (idx: number) => {
      if (activeBlock?.type === "block") {
        return activeBlock?.idx === idx;
      }
      return false;
    },
    [activeBlock]
  );

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

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

  useEffect(() => {
    const fetchPage = async () => {
      const res = await getPageCall(Number(gameId), Number(pageId));
      setPage(res);
    };

    const fetchGame = async () => {
      const res = await getAllGameCall(Number(gameId));

      setGame({
        id: res.id,
        title: res.title,
        pages: res.pages.filter(
          (page) =>
            page.id !== Number(pageId) &&
            !page.choices.some((choice) => choice.toPageId === Number(pageId))
        ),
      });
    };

    fetchGame();
    fetchPage();
  }, [gameId, pageId]);

  const backgroundImageUrl = useMemo(() => {
    if (!backgroundImage) return null;
    const url = URL.createObjectURL(backgroundImage);
    return url;
  }, [backgroundImage]);

  // URL 객체 정리
  useEffect(() => {
    return () => {
      if (backgroundImageUrl) {
        URL.revokeObjectURL(backgroundImageUrl);
      }
    };
  }, [backgroundImageUrl]);

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
        recommendChoices(Number(gameId), Number(pageId));
        const socket = connectSocket(me.userId);

        // 메시지 수신
        socket.on(
          NAMESPACES.RECOMMEND_CHOICES,
          (data: { message: { title: string; description: string }[] }) => {
            setPage({
              ...page,
              choices: data.message.map((message) => ({
                id: -1,
                text: message.title,
                nextPageId: null,
              })),
            });
            disconnectSocket(socket);
          }
        );
        break;
      case "background":
        // input type="file" 사용자에게 이미지를 받음
        const file = document.createElement("input");
        file.type = "file";
        file.accept = ".jpg, .png, .gif, .jpeg";

        file.onchange = (e: any) => {
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

  const handleComplete = async () => {
    try {
      await SavePage({
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
      toast.success("페이지가 저장되었습니다.", {});
      setTimeout(() => {
        router.push(`/builder/game/${gameId}`);
      }, 1000);
    } catch (error: any) {
      toast.error(error.message, {});
    }
  };

  const handleDeleteConfirm = async () => {
    await deletePageCall(Number(gameId), Number(pageId));
    router.push(`/builder/game/${gameId}`);
  };

  return (
    <div className="flex w-full h-full flex-col bg-white ">
      {isDeleteModalOpen && (
        <BuilderModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="삭제하시겠어요?"
          description="삭제한 페이지는 복구할 수 없어요."
          closeText="취소하기"
          confirmText="삭제하기"
        />
      )}
      {linkPage && (
        <LinkPageBottomSheet
          pageList={
            game?.pages.map((page) => ({
              id: page.id,
              title: page.title,
            })) || []
          }
          page={page}
          linkedPageId={linkPage?.linkedPageId}
          handleClose={() => setLinkPage(null)}
          handleChangePage={(pageId) => {
            setPage({
              ...page,
              choices: page.choices.map((choice) => ({
                ...choice,
                nextPageId:
                  choice.id === linkPage?.choiceId ? pageId : choice.nextPageId,
              })),
            });

            setLinkPage(null);
          }}
        />
      )}

      <div className="relative flex  bg-white ml-[20px] mr-[20px]    flex-col items-center z-10">
        <BuilderGamePageTopNav
          handleComplete={handleComplete}
          gameTitle={game?.title ?? ""}
          handleDelete={handleDelete}
        />
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
        className="flex w-full h-full flex-1 flex-col mt-[12px] bg-gray-10 overflow-y-auto pb-[200px]"
        style={{}}
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;

          setActiveBlock(null);
        }}
        onTouchStart={(e: any) => {
          if (
            e.target.id !== "page-content" &&
            e.target.id !== "background-image"
          )
            return;
          const touchStartTime = Date.now();
          const touchEndHandler = () => {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            if (touchDuration < 200) {
              // 짧게 터치했을 때 이벤트 처리
              setActiveBlock(null);
            }
            e.target.removeEventListener("touchend", touchEndHandler);
          };
          e.target.addEventListener("touchend", touchEndHandler);
        }}
      >
        {page.contents.length === 0 && (
          <div className="flex absolute bottom-[120px]  w-full  justify-center items-center ">
            <div className="text-body-md text-gray-800">
              아래 블럭을 추가해 이야기를 만들어 보세요.
            </div>
          </div>
        )}
        {backgroundImage && (
          <div className="fixed justify-center items-center top-[120px] w-full min-w-[280px] max-w-[600px] h-full z-0 ">
            <div className="relative flex w-full h-full">
              <Image
                id="background-image"
                src={backgroundImageUrl ?? ""}
                alt="background"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        )}
        <div className="flex ml-[20px] mr-[20px] flex-col gap-2 z-10">
          <div className="flex flex-col mt-4 gap-2">
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="mr-2 w-[18px] h-[18px] opacity-80"
                  checked={page.isEnding}
                  onChange={(e) => {
                    setPage({
                      ...page,
                      isEnding: e.target.checked,
                    });
                  }}
                />
                <label
                  htmlFor="checkbox"
                  className="text-body-md text-gray-800"
                >
                  엔딩 페이지
                </label>
              </div>
            </div>
            {page?.contents.map((content, idx) => (
              <div
                key={idx}
                id="page-content-container"
                className={`relative flex   flex-1 flex-col
           rounded-[6px] bg-white   p-3 border ${
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
                    !activeBlock?.isHighlight
                      ? true
                      : idx === activeBlock?.idx &&
                        activeBlock?.type === "block"
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
                activeBlock?.idx === idx && activeBlock?.type === "choice";

              return (
                <div
                  className={`flex relative p-3 bg-gray-800 rounded-[6px] flex-col gap-2
                  ${isActive ? "border-green-500 border-[2px]" : ""}
                `}
                  key={idx}
                >
                  <ChoiceBlock
                    choiceId={choice.id}
                    order={idx + 1}
                    originalText={choice.text}
                    isModal={
                      activeBlock?.type === "choice" &&
                      activeBlock?.isHighlight &&
                      activeBlock?.idx === idx
                    }
                    isOpacity50={
                      !activeBlock?.isHighlight
                        ? true
                        : idx === activeBlock?.idx
                    }
                    isActive={isActive}
                    clickBlock={() => {
                      setActiveBlock({
                        idx,
                        type: "choice",
                        isHighlight: false,
                      });
                    }}
                    longPress={() => {
                      setActiveBlock({
                        idx,
                        type: "choice",
                        isHighlight: true,
                      });
                    }}
                    handleDelete={() => {
                      const newChoices = page.choices.filter((_, idx) => {
                        if (idx === activeBlock?.idx) {
                          return false;
                        }
                        return true;
                      });
                      setPage({ ...page, choices: newChoices });
                    }}
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
                    handleLinkPage={(choiceId: number) => {
                      setLinkPage({
                        choiceId,
                        linkedPageId: choice.nextPageId,
                      });
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
            {
              key: "choice",
              isActive:
                page.choices.length < 4 &&
                !page.isEnding &&
                activeBlock === null,
            },
            {
              key: "aiChoice",
              isActive:
                page.choices.length < 4 &&
                !page.isEnding &&
                activeBlock === null,
            },
            { key: "background", isActive: activeBlock === null },
          ]}
        />
      </div>

      {/* <ToastMessage toast={toast} setToast={setToast} /> */}
    </div>
  );
}
