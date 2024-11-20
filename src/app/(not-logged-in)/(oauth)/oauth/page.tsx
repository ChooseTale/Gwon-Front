"use client";
import Image from "next/image";
import { socialGoogleButtonIcon } from "@/assets/icons";
import { signIn } from "next-auth/react";
export default function OAuthPage() {
  const loginHandler = () => {
    signIn("google");
  };

  return (
    <div className="w-full h-1/3 pt-[1.875rem] flex justify-center">
      <button
        className={`mx-10 w-full max-w-[18.75rem] xs:scale-100 h-[3.125rem] rounded-lg cursor-pointer relative `}
        type="button"
        aria-label="구글 로그인"
        onClick={loginHandler}
      >
        <Image
          src={socialGoogleButtonIcon}
          alt="Google Login"
          style={{ objectFit: "contain" }}
          fill
        />
      </button>
    </div>
  );
}
