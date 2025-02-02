"use client";

import { getMeCall } from "@/(actions)/user/me";
import { useMeStore } from "@/store/User/Me/Me.store";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  const sidCookie = getCookie("connect.sid");
  const meCookie = getCookie("me");

  useEffect(() => {
    const isLoggedin = status === "authenticated" && sidCookie !== undefined;

    if (status !== "loading" && !isLoggedin && pathname !== "/oauth") {
      deleteCookie("connect.sid");
      deleteCookie("loggedIn");
      router.push("/oauth");
    }

    if (isLoggedin && meCookie !== undefined) {
      useMeStore.getState().setMe();
    }

    if (isLoggedin && meCookie === undefined) {
      getMeCall()
        .then((res) => {
          setCookie("me", JSON.stringify(res));
          useMeStore.getState().setMe();
        })
        .catch(() => {
          deleteCookie("connect.sid");
          deleteCookie("loggedIn");
          router.push("/oauth");
        });
    }

    if (isLoggedin && pathname === "/oauth") {
      router.push("/main/game");
    }
  }, [status, sidCookie, pathname, router, meCookie]);
  return null;
}
