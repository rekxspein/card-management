import create from 'zustand';

export type IToken = {
  accessToken: string;
};

export const useAuthTokenStore = create<
  IAuthTokenState & IAuthTokenStateActions
>(set => ({
  tokens: null,

  setTokens: async (tokens: IToken | null) => {
    if (tokens) {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    } else {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    set(() => ({ tokens }));
  },
  loadTokens: async () => {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY) ?? null;

    if (accessToken) {
      return {
        accessToken
      };
    }

    return null;
  }
}));

const ACCESS_TOKEN_KEY = 'auth@access_token$key';

export type IAuthTokenState = {
  tokens: IToken | null;
};

export type IAuthTokenStateActions = {
  setTokens: (token: IToken | null) => Promise<void>;
  loadTokens: () => Promise<IToken | null>;
};
