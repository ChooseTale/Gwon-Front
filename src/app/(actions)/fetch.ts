"use server";

import { cookies } from "next/headers";

export const fetchIncetance = async (url: string, options: RequestInit) => {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("connect.sid");

  const response = await fetch(url, {
    ...options,
    headers: { Cookie: `connect.sid=${myCookie?.value}`, ...options.headers },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return response;
};
