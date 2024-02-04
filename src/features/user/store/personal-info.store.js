import { useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';

const personalInfoStore = proxy({
  createdTime: '',
  selfIntro: '',
  userEmail: '',
  userId: '',
  userImg: '',
  userName: '',
});

export const usePersonalInfo = () => {
  const personalInfo = useSnapshot(personalInfoStore);
  const setPersonalInfo = useCallback((data) => {
    Object.keys(data).forEach((key) => {
      personalInfoStore[key] = data[key];
    });
  }, []);
  return [personalInfo, setPersonalInfo];
}

const activeOptionStore = proxy({
  activeOption: 'userInfo'
});

export const useActiveOption = () => {
  const { activeOption } = useSnapshot(activeOptionStore);
  const setActiveOption = useCallback((data) => {
    activeOptionStore.activeOption = data;
  }, []);
  return [activeOption, setActiveOption];
}
