"use client";

import React from "react";
import Svg from "./Svg";

interface ToastMessageProps {
  toast: { text: string; type: "success" | "error" | "warn" } | null;
  setToast: (n: null) => void;
}

export default function ToastMessage({ toast, setToast }: ToastMessageProps) {
  if (!toast) return null;

  const { text, type } = toast;

  setTimeout(() => {
    setToast(null);
  }, 3000);

  const getSvg = (type: "success" | "error" | "warn") => {
    switch (type) {
      case "success":
        return (
          <Svg
            icon={"successIcon"}
            options={{
              size: { width: 20, height: 20 },
              viewBox: "0 0 20 20",
            }}
          />
        );
      case "error":
        return (
          <Svg
            icon={"failIcon"}
            options={{ size: { width: 20, height: 20 }, viewBox: "0 0 20 20" }}
          />
        );
      case "warn":
        return (
          <Svg
            icon={"warnIcon"}
            options={{ size: { width: 20, height: 20 }, viewBox: "0 0 20 20" }}
          />
        );
    }
  };

  return (
    <div
      className={`fixed bottom-[112px] min-w-[320px] max-w-[600px] w-full z-50 flex justify-center items-center ${
        toast ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div className="flex justify-center items-center gap-2 w-fit px-[16px] py-[10px]  h-[42px]  bg-gray-800 rounded-[8px]">
        {getSvg(type)}
        <span className="body-sb text-white">{text}</span>
      </div>
    </div>
  );
}
