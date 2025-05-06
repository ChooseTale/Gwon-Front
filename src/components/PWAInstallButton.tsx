"use client";

import { useEffect, useState } from "react";

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // 기본 설치 프롬프트 방지
      e.preventDefault();
      // 설치 프롬프트 저장
      setDeferredPrompt(e);
      // 설치 버튼 표시
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // 설치 프롬프트 표시
    deferredPrompt.prompt();

    // 사용자의 선택 대기
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("사용자가 PWA 설치를 수락했습니다.");
    } else {
      console.log("사용자가 PWA 설치를 거부했습니다.");
    }

    // 프롬프트 초기화
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 z-50"
    >
      앱 설치하기
    </button>
  );
}
