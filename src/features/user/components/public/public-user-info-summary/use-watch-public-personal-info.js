import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserInfo } from "@/features/user/api";
import { usePublicPersonalInfo } from "@/features/user/store";

export const useWatchPublicPersonalInfo = (userId) => {
  const history = useHistory();
  const [, setPublicPersonalInfo] = usePublicPersonalInfo();

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = getUserInfo({
      id: userId,
      callback: (data) => {
        if (!data) {
          history.replace('/404');
          return;
        }
        setPublicPersonalInfo({
          createdTime: data.created_time,
          selfIntro: data.self_intro,
          userEmail: data.user_email,
          userId: data.user_id,
          userImg: data.user_img,
          userName: data.user_name,
        });
      },
    });
    return unsubscribe;
  }, [history, setPublicPersonalInfo, userId])
};
