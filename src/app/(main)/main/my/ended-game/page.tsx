"use client";

import React, { useState } from "react";
import EndedGameTopNav from "./_components/EndedGameTopNav";
import SelectSortNav from "./_components/SelectSortNav";
import SortDateGameList from "./_components/SortDate/SortDateGameList";
import SortGameGameList from "./_components/SortGame/SortGameGameList";
import TopNavBar from "./_components/TopNavBar";

export default function EndedGamePage() {
  const [selectedSort, setSelectedSort] = useState<
    | {
        key: "DATE";
        value: "날짜별";
      }
    | {
        key: "GAME";
        value: "게임별";
      }
  >({ key: "DATE", value: "날짜별" });

  const handleSortChange = (sort: "DATE" | "GAME") => {
    if (sort === "DATE") {
      setSelectedSort({ key: "DATE", value: "날짜별" });
    } else {
      setSelectedSort({ key: "GAME", value: "게임별" });
    }
  };

  return (
    <div>
      <EndedGameTopNav />
      <SelectSortNav
        selectedSort={selectedSort}
        handleSortChange={handleSortChange}
      />
      <TopNavBar />
      {selectedSort.key === "DATE" ? (
        <SortDateGameList />
      ) : (
        <SortGameGameList />
      )}
    </div>
  );
}
