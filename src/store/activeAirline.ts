import create from 'zustand';
import { AIRLINES } from '../constant';

export const useActiveAirline = create<IAirline>((set, get) => ({
  activeAirline: (() => {
    const storedValue = sessionStorage.getItem('activeAirline');
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return [Object.keys(AIRLINES)[0]];
  })(),

  setActiveAirline: (airline: string[]) => {
    sessionStorage.setItem('activeAirline', JSON.stringify(airline));
    set({ activeAirline: airline });
  }
}));

type IAirline = {
  activeAirline: string[];
  setActiveAirline: (airline: string[]) => void;
};
