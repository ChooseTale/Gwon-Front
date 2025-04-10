"use client";

import React, { useEffect, useState } from "react";
import Profile from "./_components/Profile";

import ProfileInput from "./_components/Input";
import ProfileTopNav from "./_components/TopNav";
import Button from "@/common/Button";
import { useMeStore } from "@/store/User/Me/Me.store";
import { updateUserCall } from "@/(actions)/user/me";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useLoading } from "@/components/LoadingProvider";
import MarginWrapper from "../../_component/MarginWrapper";

class ProfileValidator {
  static validate(nickname: string) {
    if (nickname.length < 2) {
      throw new Error("닉네임은 2자 이상으로 작성해야 합니다.");
    }
    if (nickname.length > 20) {
      throw new Error("닉네임은 20자 이하로 작성해야 합니다.");
    }
  }
}

export default function ProfilePage() {
  const me = useMeStore((state) => state.me);
  const [userData, setUserData] = useState(me);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const router = useRouter();

  const { setIsLoading } = useLoading();

  useEffect(() => {
    setUserData(me);
  }, [me]);

  const handleProfileImageChange = (file: File) => {
    setProfileImageFile(file);
    setUserData({
      ...userData,
      profileImage: { url: URL.createObjectURL(file) },
    });
  };

  const handleInputChange = (
    key: "nickname",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  return (
    <>
      <MarginWrapper>
        <div className="flex flex-col w-full">
          <ProfileTopNav />
          <div className="mt-[32px]" />
          <Profile
            userData={userData}
            handleFileChange={handleProfileImageChange}
          />
          <div className="mt-[60px]" />
          <ProfileInput
            userData={userData}
            handleInputChange={handleInputChange}
          />
          <div className="absolute flex justify-center items-center bottom-0 left-0 right-0 mb-[32px]">
            <div className="flex flex-col w-[calc(100%-40px)]  min-w-[280px] max-w-[560px]">
              <Button
                value="저장하기"
                onClick={() => {
                  setIsLoading(true);
                  try {
                    ProfileValidator.validate(userData.nickname);
                  } catch (error: any) {
                    toast.error(error.message);
                    setIsLoading(false);
                    return;
                  }
                  const formData = new FormData();
                  formData.append("nickname", userData.nickname);
                  formData.append("image", profileImageFile as Blob);
                  updateUserCall(formData)
                    .then(() => {
                      if (formData.entries().next().done === false) {
                        useMeStore.getState().deleteMe();
                      }
                      toast.success("프로필 수정이 완료되었습니다.");
                      router.replace("/main/my");
                    })
                    .catch((error) => {
                      if (error.message == "File too large") {
                        toast.error("파일 크기가 너무 큽니다.");
                      } else {
                        toast.error("프로필 수정에 실패했습니다.");
                      }
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }}
              />
            </div>
          </div>
        </div>
      </MarginWrapper>
    </>
  );
}
