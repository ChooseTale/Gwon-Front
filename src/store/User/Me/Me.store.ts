import { getCookie, deleteCookie } from "cookies-next";
import { create } from "zustand";
import { getMe } from "@choosetale/nestia-type/lib/functional/user/me/index";

interface MeStore {
  me: {
    userId: number;
    email: string;
    nickname: string;
    profileImage: {
      url: string;
    };
    admin: {
      isMaster: boolean;
    };
  };

  setMe: () => void;
  deleteMe: () => void;
}

export const useMeStore = create<MeStore>((set) => ({
  me: {
    userId: 0,
    email: "",
    nickname: "",
    profileImage: { url: "" },
    admin: { isMaster: false },
  },

  setMe: () =>
    set(() => {
      if (getCookie("me") === undefined) {
        return {};
      }

      const meCookie = JSON.parse(getCookie("me") as string) as getMe.Output;

      return {
        me: {
          userId: meCookie.id,
          email: meCookie.email,
          nickname: meCookie.nickname,
          profileImage: meCookie.profileImage,
          admin: {
            isMaster: meCookie.admin.isMaster,
          },
        },
      };
    }),

  deleteMe: () =>
    set(() => {
      deleteCookie("me");
      return {};
    }),
}));
