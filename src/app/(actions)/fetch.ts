import { cookies } from "next/headers";

export const fetchIncetance = async (url: string, options: RequestInit) => {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get("connect.sid");

  return fetch(url, {
    ...options,
    headers: { Cookie: `connect.sid=${myCookie?.value}` },
  });
};
