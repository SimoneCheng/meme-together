import { useEffect } from "react";
import { useSelector } from "react-redux";
import { checkAllFollowing } from "@/features/user/api";
import { usePersonalFollowing } from "@/features/user/store";

export const useWatchPersonalFollowing = () => {
  const userData = useSelector((state) => state.userData);
  const [, setPersonalFollowing] = usePersonalFollowing();

  useEffect(() => {
    if (!userData || !userData.user_id) {
      return;
    }
    const unsubscribe = checkAllFollowing({
      id: userData.user_id,
      callback: (data) => {
        setPersonalFollowing(data ?? [])
      }
    });
    return () => unsubscribe();
  }, [setPersonalFollowing, userData])
};
