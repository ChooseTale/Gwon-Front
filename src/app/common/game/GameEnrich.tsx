import { ClockIcon, InfoCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import DateDisplay from "../text/DateDisplay";
import TextWithCounts from "../text/TextWithCounts";
import TextWithNumberRange from "../text/TextWithCountsRange";

interface GameInfomationProps {
  enrich: {
    lastUpdatedAt?: string;
    expectPlayTime?: number;
    totalPlayCount?: number;
    completedEnding?: number;
    totalEnding?: number;
  };
  mode?: "game" | "game-play";
}

export default function GameEnrich({
  enrich,
  mode = "game",
}: GameInfomationProps) {
  const {
    lastUpdatedAt,
    expectPlayTime,
    totalEnding,
    totalPlayCount,
    completedEnding,
  } = enrich;

  const components = [
    lastUpdatedAt && (
      <div
        key="lastUpdatedAt"
        className="text-xs flex items-center gap-2"
        title="작성 날짜"
      >
        <Pencil1Icon color="#28c362" />
        <DateDisplay date={lastUpdatedAt} />
      </div>
    ),
    <div
      key="expectPlayTime"
      className="text-xs flex items-center gap-2"
      title="예상 게임 시간"
    >
      <ClockIcon color="#28c362" />
      예상 게임 시간: {expectPlayTime || 0}분
    </div>,
    <div key="endingDetails" className="flex gap-2 flex-wrap" title="게임 상세">
      <InfoCircledIcon color="#28c362" />
      <TextWithCounts text="플레이 횟수" counts={totalPlayCount || 0} />
      <TextWithNumberRange
        text="엔딩"
        value={completedEnding || 0}
        max={totalEnding || 0}
      />
    </div>,
  ];

  const orderMap = {
    game: [0, 1, 2],
    "game-play": [2, 1, 0],
  };

  return <>{orderMap[mode].map((index) => components[index])}</>;
}
