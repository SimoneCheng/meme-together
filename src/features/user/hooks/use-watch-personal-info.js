import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../api";
import { usePersonalInfo } from "../store";

export const useWatchPersonalInfo = (callback) => {
  const userData = useSelector((state) => state.userData);
  const [, setPersonalInfo] = usePersonalInfo();

  useEffect(() => {
    if (!userData) return;
    const unsubscribe = getUserInfo({
      id: userData.user_id,
      callback: (data) => {
        if (!data) return;
        setPersonalInfo({
          createdTime: data.created_time,
          selfIntro: data.self_intro,
          userEmail: data.user_email,
          userId: data.user_id,
          userImg: data.user_img,
          userName: data.user_name,
        });
        callback?.(data)
      },
    });
    return () => unsubscribe();
  }, [callback, setPersonalInfo, userData])
};
