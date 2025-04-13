import React from "react";
import UserProfile from "./_components/UserProfile";
import ContinuedGames from "./_components/ContinuedGames";
import EndedGameNav from "./_components/EndedGameNav";
import SignOut from "./_components/SignOut";
import MarginWrapper from "../_component/MarginWrapper";

export default function page() {
  return (
    <>
      <MarginWrapper>
        <div className="flex flex-col w-full">
          <UserProfile />
          <div className="mt-[56px]" />
          <ContinuedGames />
        </div>
      </MarginWrapper>
      <div className="w-full min-h-[12px] h-[12px] bg-gray-900   relative" />
      <MarginWrapper>
        <div className="flex flex-col w-full">
          <EndedGameNav />
          <div className="mt-[26px]" />
          <SignOut />
          <div className="mb-[60px]" />
        </div>
      </MarginWrapper>
    </>
  );
}
