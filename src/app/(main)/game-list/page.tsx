"use client";

import Crad from "@/common/Game/Crad";
import React from "react";

export default function page() {
  return (
    <div>
      <Crad
        clickCard={(cardId: number) => {
          console.log(cardId);
        }}
        cards={{
          id: 1,
          image:
            "https://img.sbs.co.kr/newsnet/etv/upload/2024/04/25/30000922260_1280.jpg",
          title: "게임 제목",
          category: "게임 카테고리",
        }}
        enrich={{ players: 10 }}
        users={[
          {
            id: 1,
            imageUrl:
              "https://img.sbs.co.kr/newsnet/etv/upload/2024/04/25/30000922260_1280.jpg",
          },
          {
            id: 2,
            imageUrl:
              "https://img.sbs.co.kr/newsnet/etv/upload/2024/04/25/30000922260_1280.jpg",
          },
        ]}
      />
    </div>
  );
}
