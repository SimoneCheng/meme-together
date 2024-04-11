import { useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';

const authStore = proxy({
  isAuthenticated: false,
  authId: ''
});

export const useIsAuthenticated = () => {
  const { isAuthenticated} = useSnapshot(authStore);
  const setIsAuthenticated = useCallback((data) => {
    authStore.isAuthenticated = data;
  }, []);
  return [isAuthenticated, setIsAuthenticated];
};

export const useAuthId = () => {
  const { authId } = useSnapshot(authStore);
  const setAuthId = useCallback((data) => {
    authStore.authId = data;
  }, []);
  return [authId, setAuthId];
};
