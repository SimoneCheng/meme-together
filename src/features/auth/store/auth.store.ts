import { useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';

const authStore = proxy({
  isAuthenticated: false,
  authId: ''
});

export const useIsAuthenticated = () => {
  const { isAuthenticated } = useSnapshot(authStore);
  const setIsAuthenticated = useCallback((data: boolean) => {
    authStore.isAuthenticated = data;
  }, []);
  return [isAuthenticated, setIsAuthenticated] as const;
};

export const useAuthId = () => {
  const { authId } = useSnapshot(authStore);
  const setAuthId = useCallback((data: string) => {
    authStore.authId = data;
  }, []);
  return [authId, setAuthId] as const;
};
