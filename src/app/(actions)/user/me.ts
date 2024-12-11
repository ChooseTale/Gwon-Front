import { getMe } from "@choosetale/nestia-type/lib/functional/user/me/index";

export const getMeCall = async () => {
  const meData = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API + getMe.METADATA.path,
    {
      method: getMe.METADATA.method,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await meData.json();
};