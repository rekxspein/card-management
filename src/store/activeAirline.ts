import create from 'zustand';
import { AIRLINES } from '../constant';

export const useActiveAirline = create<IAirline>(set => ({
  activeAirline: [Object.keys(AIRLINES)[0]],

  setActiveAirline: (airline: string[]) => set({ activeAirline: airline })
}));

type IAirline = {
  activeAirline: string[];
  setActiveAirline: (airline: string[]) => void;
};
