import { useCallback } from 'react';
import { proxy, useSnapshot } from 'valtio';

const publicActiveOptionStore = proxy({
  activeOption: 'allPublicMeme',
});

export const usePublicActiveOption = () => {
  const publicActiveOption = useSnapshot(publicActiveOptionStore).activeOption;
  const setPublicActiveOption = useCallback((data: 'allPublicMeme' | 'followers' | 'following') => {
    publicActiveOptionStore.activeOption = data;
  }, []);
  return [publicActiveOption, setPublicActiveOption] as const;
};

const publicPersonalInfoStore = proxy({
  createdTime: '',
  selfIntro: '',
  userEmail: '',
  userId: '',
  userImg: '',
  userName: '',
});

export const usePublicPersonalInfo = () => {
  const publicPersonalInfo = useSnapshot(publicPersonalInfoStore);
  const setPublicPersonalInfo = useCallback((data: Partial<typeof publicPersonalInfoStore>) => {
    Object.keys(data).forEach((key) => {
      publicPersonalInfoStore[key] = data[key];
    });
  }, []);
  return [publicPersonalInfo, setPublicPersonalInfo] as const;
};

const allFollowingStore = proxy({
  ids: [],
  allFollowingList: []
});

export const useAllFollowing = () => {
  const allFollowing = useSnapshot(allFollowingStore);
  const setAllFollowing = useCallback((data: Partial<typeof allFollowingStore>) => {
    Object.keys(data).forEach((key) => {
      allFollowingStore[key] = data[key];
    });
  }, []);
  return [allFollowing, setAllFollowing] as const;
};

const allFollowersStore = proxy({
  ids: [],
  allFollowersList: []
});

export const useAllFollowers = () => {
  const allFollowers = useSnapshot(allFollowersStore);
  const setAllFollowers = useCallback((data: Partial<typeof allFollowersStore>) => {
    Object.keys(data).forEach((key) => {
      allFollowersStore[key] = data[key];
    });
  }, []);
  return [allFollowers, setAllFollowers] as const;
};
