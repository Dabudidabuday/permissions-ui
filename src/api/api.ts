import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const queryClient = new QueryClient();



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Axios received a 401 error");

      try {
        const refreshResponse = await api.post("/auth/refresh", {}, { withCredentials: true });

        if(refreshResponse.data.length) {
          window.location.reload();
        }

      } catch(e) {
        console.error('error while trying to refresh token', e);
      }
    }
    return Promise.reject(error);
  }
);
