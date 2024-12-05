"use client";
import { usePathname } from "next/navigation";
import Icon from "./NavBar/Icon";
import Link from "next/link";

export default function NavBar() {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className="fixed left-0 bottom-[-1px] w-full h-[4rem] shrink-0 bg-background-dark border-t border-gray-900">
      <div className="flex justify-center w-full h-[4rem] shrink-0 bg-background-dark border-t border-gray-900">
        <Link
          className="flex justify-center items-center"
          href="/game-list/game"
        >
          <Icon
            icon="bookOpenIcon"
            label="게임"
            isSelected={pathname.startsWith("/game-list/game")}
          />
        </Link>
        <Link
          className="flex justify-center items-center"
          href="/game-list/builder"
        >
          <Icon
            icon="editIcon"
            label="빌더"
            isSelected={pathname.startsWith("/game-list/builder")}
          />
        </Link>
        <Link className="flex justify-center items-center" href="/game-list/my">
          <Icon
            icon="userIcon"
            label="마이"
            isSelected={pathname.startsWith("/game-list/my")}
          />
        </Link>
      </div>
    </div>
  );
}
