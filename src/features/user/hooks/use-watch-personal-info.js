import { useEffect } from "react";
import { getUserInfo } from "../api";
import { useAuthId } from "@/features/auth";
import { usePersonalInfo } from "../store";

export const useWatchPersonalInfo = (callback) => {
  const [authId] = useAuthId();
  const [, setPersonalInfo] = usePersonalInfo();

  useEffect(() => {
    if (!authId) return;
    const unsubscribe = getUserInfo({
      id: authId,
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
        callback?.(data);
      },
    });
    return unsubscribe;
  }, [authId, callback, setPersonalInfo]);
};
