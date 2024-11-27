import { getList } from "@choosetale/nestia-type/lib/functional/game_play/list/index";

export class GameListEntity {
  gameList: {
    game: {
      id: number;
      title: string;
      thumbnail: null | {
        id: number;
        url: string;
      };
      genre: string;
      createdAt: string;
      updatedAt: string;
      player: {
        userId: number;
        nickname: string;
        profileImage: {
          url: string;
        };
      }[];
    };
    publisher: {
      userId: number;
      nickname: string;
      profileImage: {
        url: string;
      };
    };
    enrichData: {
      totalEndingCount: number;
      totalRechedEndingPlayCount: number;
      expectPlayTime: number;
      me: {
        isExistReachedEndingPlay: boolean;
        reachedEndingPlayCount: number;
        isExistContinuePlay: boolean;
      };
    };
  }[];
  constructor(serverGameList: getList.Output) {
    this.gameList = serverGameList;
  }
}
