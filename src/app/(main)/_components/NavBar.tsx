"use client";
import { usePathname } from "next/navigation";
import Icon from "./NavBar/Icon";
import Link from "next/link";

export default function NavBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/main/my/profile")) return null;

  return (
    <div className="fixed left-0 bottom-[-1px] w-full h-[4rem] shrink-0 bg-background-dark border-t border-gray-900">
      <div className="flex justify-center w-full h-[4rem] shrink-0 bg-background-dark border-t border-gray-900">
        <Link className="flex justify-center items-center" href="/main/game">
          <Icon
            icon="bookOpenIcon"
            label="게임"
            isSelected={pathname.startsWith("/main/game")}
          />
        </Link>
        <Link className="flex justify-center items-center" href="/main/builder">
          <Icon
            icon="editIcon"
            label="빌더"
            isSelected={pathname.startsWith("/main/builder")}
          />
        </Link>
        <Link className="flex justify-center items-center" href="/main/my">
          <Icon
            icon="userIcon"
            label="마이"
            isSelected={pathname.startsWith("/main/my")}
          />
        </Link>
      </div>
    </div>
  );
}
