"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { logoutCall, signOutCall } from "@/(actions)/user/auth";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function SignOut() {
  const [modal, setModal] = useState<React.ReactNode | null>(null);
  const router = useRouter();

  const handleModal = (modal: "logout" | "signout") => {
    switch (modal) {
      case "logout":
        setModal(
          <Modal
            modal={{
              title: "로그아웃 하시겠어요?",
              content: (
                <span>
                  로그아웃해도 정보는 <br /> 사라지지 않습니다.
                </span>
              ),
              confirmButtonStr: "로그아웃",
            }}
            handleCancel={() => setModal(null)}
            handleConfirm={() => {
              logoutCall();

              deleteCookie("connect.sid");
              deleteCookie("loggedIn");
              deleteCookie("me");

              router.push("/oauth");
            }}
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
            handleConfirm={() => {
              signOutCall().then(() => {
                deleteCookie("connect.sid");
                deleteCookie("loggedIn");
                deleteCookie("me");
                router.push("/oauth");
              });
            }}
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
        className="flex text-gray-400 body-rg"
        onClick={() => {
          handleModal("logout");
        }}
      >
        로그아웃
      </div>
      <div className="flex text-gray-400 body-rg-14">|</div>
      <div
        className="flex text-gray-400 body-rg"
        onClick={() => handleModal("signout")}
      >
        탈퇴하기
      </div>
    </div>
  );
}
