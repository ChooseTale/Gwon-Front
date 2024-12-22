"use server";

import {
  logout,
  signOut,
} from "@choosetale/nestia-type/lib/functional/user/index";
import { testUserLogin } from "@choosetale/nestia-type/lib/functional/test_user/login/index";
import { fetchIncetance } from "../fetch";
import { cookies } from "next/headers";

export const testUserLoginCall = async () => {
  const res = await fetchIncetance(
    process.env.NEXT_PUBLIC_BACKEND_API +
      testUserLogin.METADATA.path +
      `?userId=1`,
    {
      method: testUserLogin.METADATA.method,
    }
  );

  const setCookieHeader = res.headers.get("set-cookie");
  const connectSid = setCookieHeader?.split(";")[0].replace("connect.sid=", "");
  if (connectSid) {
    const cookieStore = await cookies();
    cookieStore.set("connect.sid", connectSid);
    cookieStore.set("loggedIn", "true");
  }
};

export const logoutCall = async () => {
  try {
    await fetchIncetance(
      process.env.NEXT_PUBLIC_BACKEND_API + logout.METADATA.path,
      {
        method: logout.METADATA.method,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const signOutCall = async () => {
  try {
    await fetchIncetance(
      process.env.NEXT_PUBLIC_BACKEND_API + signOut.METADATA.path,
      {
        method: signOut.METADATA.method,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
