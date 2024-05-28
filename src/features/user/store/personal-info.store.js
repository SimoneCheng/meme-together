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
};

const settingActiveOptionStore = proxy({
  activeOption: 'userInfo'
});

export const useSettingActiveOption = () => {
  const { activeOption } = useSnapshot(settingActiveOptionStore);
  const setActiveOption = useCallback((data) => {
    settingActiveOptionStore.activeOption = data;
  }, []);
  return [activeOption, setActiveOption];
};

const personalFollowingStore = proxy({
  ids: []
});

export const usePersonalFollowing = () => {
  const { ids } = useSnapshot(personalFollowingStore);
  const setPersonalFollowing = useCallback((data) => {
    personalFollowingStore.ids = data;
  }, []);
  return [ids, setPersonalFollowing];
};
