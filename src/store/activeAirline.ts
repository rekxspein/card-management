import create from 'zustand';

export const useActiveAirline = create<IAirline>(set => ({
  activeAirline: ['Air Asia'],

  setActiveAirline: (airline: string[]) => set({ activeAirline: airline })
}));

export type IAirline = {
  activeAirline: string[];
  setActiveAirline: (airline: string[]) => void;
};
