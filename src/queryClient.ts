import axios from 'axios';
import { QueryClient } from 'react-query';
import { BASE_API_URL } from './constant';

const instance = axios.create({
  baseURL: BASE_API_URL
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5 // 5 minutes
    }
  }
});

const apiClient = instance;

export default instance;

export { apiClient, queryClient };
