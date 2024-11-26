"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Icon from "./NavBar/Icon";
import Link from "next/link";

export default function NavBar() {
  const searchParams = useSearchParams();

  return (
    <div className="fixed left-0 bottom-0 w-full h-[4rem] shrink-0 bg-background-dark border-t border-grey-900">
      <div className="flex justify-center w-full h-[4rem] shrink-0 bg-background-dark border-t border-grey-900">
        <Link
          className="flex justify-center items-center"
          href="/game-list?category=game"
        >
          <Icon
            icon="bookOpenIcon"
            label="게임"
            isSelected={searchParams.get("category") === "game"}
          />
        </Link>
        <Link
          className="flex justify-center items-center"
          href="/game-list?category=builder"
        >
          <Icon
            icon="editIcon"
            label="빌더"
            isSelected={searchParams.get("category") === "builder"}
          />
        </Link>
        <Link
          className="flex justify-center items-center"
          href="/game-list?category=my"
        >
          <Icon
            icon="userIcon"
            label="마이"
            isSelected={searchParams.get("category") === "my"}
          />
        </Link>
      </div>
    </div>
  );
}
