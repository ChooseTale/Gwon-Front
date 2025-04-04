import React from "react";
import UserProfile from "./_components/UserProfile";
import ContinuedGames from "./_components/ContinuedGames";
import EndedGameNav from "./_components/EndedGameNav";
import SignOut from "./_components/SignOut";

export default function page() {
  return (
    <>
      <UserProfile />
      <div className="mt-[56px]" />
      <ContinuedGames />
      <div className="w-[100vw] min-h-[12px] h-[12px] bg-gray-900  mt-[40px] mb-[40px] relative" />
      <EndedGameNav />
      <div className="mt-[26px]" />
      <SignOut />
      <div className="mb-[60px]" />
    </>
  );
}
