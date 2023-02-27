const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

export const BASE_API_URL = baseApiUrl;

const mockapi = import.meta.env.VITE_REACT_APP_API;

export const MOCKAPI = mockapi;

export const AIRLINES = {
  AIR_ASIA: 'Air Asia',
  GO_AIRLINES: 'Go AirLines'
};

export interface IAirlines {
  AIR_ASIA: string;
  GO_AIRLINES: string;
}
