"use client";

import React, { useEffect, useState } from "react";
import Profile from "./_components/Profile";

import ProfileInput from "./_components/Input";
import ProfileTopNav from "./_components/TopNav";
import Button from "@/common/Button";
import { useMeStore } from "@/store/User/Me/Me.store";
import { updateUserCall } from "@/app/(actions)/user/me";

export default function ProfilePage() {
  const me = useMeStore((state) => state.me);
  const [userData, setUserData] = useState(me);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  useEffect(() => {
    setUserData(me);
  }, [me]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setUserData({
        ...userData,
        profileImage: { url: URL.createObjectURL(file) },
      });
    }
  };

  const handleInputChange = (
    key: "nickname",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  return (
    <div className="relative h-full ">
      <ProfileTopNav />
      <div className="mt-[32px]" />
      <Profile
        userData={userData}
        handleFileChange={handleProfileImageChange}
      />
      <div className="mt-[60px]" />
      <ProfileInput userData={userData} handleInputChange={handleInputChange} />
      <div className="absolute bottom-0 left-0 right-0 mb-[32px]">
        <Button
          value="저장하기"
          onClick={() => {
            const formData = new FormData();
            formData.append("nickname", userData.nickname);
            formData.append("image", profileImageFile as Blob);
            updateUserCall(formData);
            if (formData.entries().next().done === false) {
              useMeStore.getState().deleteMe();
            }
          }}
        />
      </div>
    </div>
  );
}
