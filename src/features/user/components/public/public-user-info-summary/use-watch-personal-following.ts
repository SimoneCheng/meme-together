import { useEffect } from "react";
import { useAuthId } from "@/features/auth";
import { checkAllFollowing } from "@/features/user/api";
import { usePersonalFollowing } from "@/features/user/store";

export const useWatchPersonalFollowing = () => {
  const [authId] = useAuthId();
  const [, setPersonalFollowing] = usePersonalFollowing();

  useEffect(() => {
    if (!authId) return;
    const unsubscribe = checkAllFollowing({
      id: authId,
      callback: (data) => {
        setPersonalFollowing(data ?? []);
      }
    });
    return unsubscribe;
  }, [authId, setPersonalFollowing]);
};
