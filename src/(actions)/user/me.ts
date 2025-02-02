"use server";

import { getMe } from "@choosetale/nestia-type/lib/functional/user/me/index";
import { updateUser } from "@choosetale/nestia-type/lib/functional/user/index";
import { fetchIncetance } from "../fetch";

export const getMeCall = async () => {
  const meData = await fetchIncetance(
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

export const updateUserCall = async (formData: FormData) => {
  const userData = await fetchIncetance(
    process.env.NEXT_PUBLIC_BACKEND_API + updateUser.METADATA.path,
    {
      method: updateUser.METADATA.method,

      body: formData,
    }
  );

  return await userData.json();
};
