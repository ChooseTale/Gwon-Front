import React from "react";
import UserProfile from "./_components/UserProfile";
import ContinuedGames from "./_components/ContinuedGames";
import EndedGameNav from "./_components/EndedGameNav";

export default function page() {
  return (
    <>
      <UserProfile />
      <div className="mt-[56px]" />
      <ContinuedGames />
      <div className="w-[100vw] h-[12px] bg-gray-900  mt-[40px] mb-[40px] ml-[-20px]" />
      <EndedGameNav />
    </>
  );
}
