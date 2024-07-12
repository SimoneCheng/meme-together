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
  const setPersonalInfo = useCallback((data: Partial<typeof personalInfoStore>) => {
    Object.keys(data).forEach((key) => {
      personalInfoStore[key] = data[key];
    });
  }, []);
  return [personalInfo, setPersonalInfo] as const;
};

const settingActiveOptionStore = proxy({
  activeOption: 'userInfo'
});

export const useSettingActiveOption = () => {
  const { activeOption } = useSnapshot(settingActiveOptionStore);
  const setActiveOption = useCallback((data: 'userInfo' | 'password' | 'deleteAccount') => {
    settingActiveOptionStore.activeOption = data;
  }, []);
  return [activeOption, setActiveOption] as const;
};

const personalFollowingStore = proxy<{ ids: string[]; }>({
  ids: []
});

export const usePersonalFollowing = () => {
  const { ids } = useSnapshot(personalFollowingStore);
  const setPersonalFollowing = useCallback((data: string[]) => {
    personalFollowingStore.ids = data;
  }, []);
  return [ids, setPersonalFollowing] as const;
};
