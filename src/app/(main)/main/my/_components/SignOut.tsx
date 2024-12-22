"use client";

import React, { useState } from "react";
import Modal from "./Modal";

export default function SignOut() {
  const [modal, setModal] = useState<React.ReactNode | null>(null);

  const handleModal = (modal: "logout" | "signout") => {
    switch (modal) {
      case "logout":
        setModal(
          <Modal
            modal={{
              title: "로그아웃 하시겠어요?",
              content: (
                <span>
                  로그아웃한 계정은 복구가 <br /> 불가합니다.
                </span>
              ),
              confirmButtonStr: "로그아웃",
            }}
            handleCancel={() => setModal(null)}
            handleConfirm={() => {}}
          />
        );
        break;
      case "signout":
        setModal(
          <Modal
            modal={{
              title: "탈퇴하시겠어요?",
              content: (
                <span>
                  탈퇴한 계정은 복구가 <br /> 불가합니다.
                </span>
              ),
              confirmButtonStr: "탈퇴하기",
            }}
            handleCancel={() => setModal(null)}
            handleConfirm={() => {}}
          />
        );
        break;
      default:
        throw new Error("Invalid modal type");
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {modal && modal}
      <div
        className="flex text-gray-400 body-rg-14"
        onClick={() => handleModal("logout")}
      >
        로그아웃
      </div>
      <div className="flex text-gray-400 body-rg-14">|</div>
      <div
        className="flex text-gray-400 body-rg-14"
        onClick={() => handleModal("signout")}
      >
        탈퇴하기
      </div>
    </div>
  );
}
