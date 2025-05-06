"use client";

import { useEffect, useState } from "react";

// beforeinstallprompt 이벤트를 위한 타입 정의
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // 이미 이벤트가 발생했는지 확인하기 위한 변수
    let promptEvent: BeforeInstallPromptEvent | null = null;

    const handler = (e: Event) => {
      // 타입 캐스팅
      promptEvent = e as BeforeInstallPromptEvent;

      // 기본 설치 프롬프트 방지
      e.preventDefault();

      // 설치 프롬프트 저장
      setDeferredPrompt(promptEvent);

      // 설치 버튼 표시
      setShowInstallButton(true);

      console.log("beforeinstallprompt 이벤트 발생!");
    };

    // 이벤트 리스너 등록
    window.addEventListener("beforeinstallprompt", handler);

    // 이미 설치되었는지 확인
    window.addEventListener("appinstalled", () => {
      console.log("PWA가 이미 설치되어 있습니다.");
      setShowInstallButton(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", () => {});
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log("deferredPrompt가 없습니다.");
      return;
    }

    console.log("PWA 설치 프롬프트 표시 시도...");

    try {
      // 설치 프롬프트 표시
      await deferredPrompt.prompt();

      // 사용자의 선택 대기
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("사용자가 PWA 설치를 수락했습니다.");
      } else {
        console.log("사용자가 PWA 설치를 거부했습니다.");
      }
    } catch (error) {
      console.error("PWA 설치 과정에서 오류 발생:", error);
    }

    // 프롬프트 초기화
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  // 디버깅을 위해 항상 버튼을 표시하고 상태를 표시할 수도 있습니다
  // return (
  //   <div className="fixed bottom-4 right-4 z-50">
  //     {showInstallButton ? (
  //       <button
  //         onClick={handleInstallClick}
  //         className="bg-blue-500 text-white p-2 rounded"
  //       >
  //         앱 설치하기
  //       </button>
  //     ) : (
  //       <div className="text-sm bg-gray-200 p-1 rounded">
  //         설치 버튼 사용 불가
  //       </div>
  //     )}
  //   </div>
  // );

  if (!showInstallButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-2 rounded"
    >
      앱 설치하기
    </button>
  );
}
