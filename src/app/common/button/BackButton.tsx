"use client";
import { useRouter } from "next/navigation";
import ThemedIconButton from "@themed/ThemedIconButton";
import ChevronLeftIcon from "@asset/icons/chevron-left.svg";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <ThemedIconButton className="my-1" onClick={() => router.back()}>
      <ChevronLeftIcon className={className} />
    </ThemedIconButton>
  );
}
