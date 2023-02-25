import create from 'zustand';

export const useUiState = create<IUiState & IUiStateActions>(set => ({
  drawerWidth: 230,
  drawerOpen: true,

  setDrawerWidth: (width: number) => set({ drawerWidth: width }),
  setDrawerOpen: (open: boolean) => set({ drawerOpen: open })
}));

export type IUiState = {
  drawerWidth: number;
  drawerOpen: boolean;
};

type IUiStateActions = {
  setDrawerWidth: (width: number) => void;
  setDrawerOpen: (open: boolean) => void;
};
