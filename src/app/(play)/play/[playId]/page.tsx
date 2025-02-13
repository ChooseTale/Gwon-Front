"use client";

import {
  chooseChoiceCall,
  endGameCall,
  getPlayData,
} from "@/(actions)/main/play-game/play";
import { getPlayGameScreen } from "@choosetale/nestia-type/lib/functional/game_play/play";
import { useParams, useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PlayGame from "../_component/PlayGame";

export default function GamePlayPage() {
  const { playId } = useParams();
  const [playData, setPlayData] = useState<getPlayGameScreen.Output>();
  const router = useRouter();

  useEffect(() => {
    const fetchPage = async () => {
      const page = await getPlayData(Number(playId));

      setPlayData(page);
    };
    fetchPage();
  }, [playId]);

  if (!playData) return null;

  const handleChoiceClick = async (choiceId: number) => {
    await chooseChoiceCall(Number(playId), choiceId);
    const updatedPage = await getPlayData(Number(playId));
    console.log(updatedPage);
    setPlayData(updatedPage);
  };

  return (
    <div className="flex w-full h-full">
      <PlayGame
        game={{
          id: playData.gameIntroData.game.id,
          title: playData.gameIntroData.game.title,
        }}
        page={{
          id: playData.page.id,
          title: "",
          backgroundImage: { url: playData.page.backgroundImageUrl },
          isEnding: playData.page.isEnding,
          endingOnClick: () => {
            endGameCall(Number(playId), playData.page.id);
            router.push(`/main/game/${playId}/ending`);
          },
          contents: playData.page.contents as any,
          choices: playData.page.choices.map((choice) => {
            return {
              id: choice.id,
              title: choice.title,
              onClick: () => {
                handleChoiceClick(choice.id);
              },
            };
          }),
        }}
      />
    </div>
  );
}
