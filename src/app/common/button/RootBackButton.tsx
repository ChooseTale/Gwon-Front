"use client";
import { useRouter } from "next/navigation";
import ThemedIconButton from "@themed/ThemedIconButton";
import ChevronLeftIcon from "@asset/icons/chevron-left.svg";

export default function RootBackButton({
  rootPath,
  className,
}: {
  rootPath: string;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(rootPath);
  };

  return (
    <ThemedIconButton className="my-1" onClick={handleClick}>
      <ChevronLeftIcon className={className} />
    </ThemedIconButton>
  );
}
