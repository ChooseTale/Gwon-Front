import React from "react";
import UserProfile from "./_components/UserProfile";
import ContinuedGames from "./_components/ContinuedGames";

export default function page() {
  return (
    <div>
      <UserProfile />
      <div className="mt-[56px]" />
      <ContinuedGames />
    </div>
  );
}
