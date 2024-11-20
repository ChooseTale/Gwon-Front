"use client";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/packages/ui/components/ui/Button";

export default function GameRestartButton({ gameId }: { gameId: number }) {
  const router = useRouter();

  const handleRestartClick = () => {
    if (confirm("게임을 처음부터 시작하시겠습니까?")) {
      router.push(`/game-play/start?gameId=${gameId}`);
    }
  };

  return (
    <Button
      className="w-full h-auto border border-b-2 border-black gap-2 text-lg"
      variant="ghost"
      onClick={handleRestartClick}
    >
      <ReloadIcon />
      새로 하기
    </Button>
  );
}
