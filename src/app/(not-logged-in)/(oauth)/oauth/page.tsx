"use client";
import { signIn } from "next-auth/react";
import Svg from "@/common/Svg";
import { testUserLoginCall } from "@/(actions)/user/auth";
import { useRouter } from "next/navigation";
import PWAInstallButton from "@/components/PWAInstallButton";
import { Footer } from "@/components/Footer";

export default function OAuthPage() {
  const router = useRouter();
  const loginHandler = () => {
    signIn("google");
  };

  return (
    <div className="w-full h-full  flex flex-col justify-center items-center mb-[145px]">
      <div
        className="flex
      shadow-[0px_1.25px_40px_rgba(34,197,94,0.49)]
        w-[100px] h-[100px] rounded-[26px]
         justify-center items-center
         mb-[42px]
      "
        onClick={() => {
          const nodeEnv = process.env.NODE_ENV;
          if (nodeEnv === "development") {
            testUserLoginCall().then(() => {
              router.push("/main/game");
            });
          }
        }}
      >
        <Svg
          icon="taleIcon"
          options={{
            size: { width: 43, height: 43 },
            color: "green-500",
            viewBox: "0 0 43 43",
            fillColor: "green-500",
          }}
        />
      </div>
      <div className=" text-green-400 text-[24px] font-bold mb-[178px]">
        ChooseTale
      </div>
      <button
        className={`mx-10 w-full max-w-[18.75rem] xs:scale-100 h-[3.125rem] rounded-[26px] cursor-pointer relative `}
        type="button"
        aria-label="구글 로그인"
        onClick={loginHandler}
      >
        <Svg
          icon="socialGoogleButtonIcon"
          options={{
            size: { width: 300, height: 50 },
            viewBox: "0 0 300 50",
          }}
        />
      </button>
      <Footer />
      <PWAInstallButton />
    </div>
  );
}
