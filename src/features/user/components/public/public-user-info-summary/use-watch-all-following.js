import { useEffect } from "react";
import { checkAllFollowing } from "@/features/user/api";
import { useAllFollowing } from "@/features/user/store";

export const useWatchAllFollowing = (userId) => {
  const [, setAllFollowing] = useAllFollowing();

  useEffect(() => {
    const unsubscribe = checkAllFollowing({
      id: userId,
      callback: (data) => {
        setAllFollowing({ ids: data ?? [] })
      }
    });
    return unsubscribe;
  }, [setAllFollowing, userId])
};
