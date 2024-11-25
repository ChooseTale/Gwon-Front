"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  const sidCookie = getCookie("connect.sid");

  useEffect(() => {
    const isLoggedin = status === "authenticated" && sidCookie !== undefined;

    if (status !== "loading" && !isLoggedin && pathname !== "/oauth") {
      deleteCookie("connect.sid");
      deleteCookie("loggedIn");
      router.push("/oauth");
    }
    if (isLoggedin && pathname === "/oauth") {
      router.push("/game-list");
    }
  }, [status, sidCookie, pathname, router]);
  return null;
}
