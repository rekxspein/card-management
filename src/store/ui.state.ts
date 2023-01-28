import create from 'zustand';

export const useUiState = create<IUiState & IUiStateActions>(set => ({
  drawerWidth: 230,
  drawerOpen: true,
  mapLoading: true,

  setDrawerWidth: (width: number) => set({ drawerWidth: width }),
  setDrawerOpen: (open: boolean) => set({ drawerOpen: open }),
  setMapLoading: (loading: boolean) => set({ mapLoading: loading })
}));

export type IUiState = {
  drawerWidth: number;
  drawerOpen: boolean;
  mapLoading: boolean;
};

type IUiStateActions = {
  setDrawerWidth: (width: number) => void;
  setDrawerOpen: (open: boolean) => void;
  setMapLoading: (loading: boolean) => void;
};
