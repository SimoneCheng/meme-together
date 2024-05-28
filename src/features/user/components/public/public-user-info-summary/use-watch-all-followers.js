import { useEffect } from "react";
import { checkAllFollowers } from "@/features/user/api";
import { useAllFollowers } from "@/features/user/store";

export const useWatchAllFollowers = (userId) => {
  const [, setAllFollowers] = useAllFollowers();

  useEffect(() => {
    const unsubscribe = checkAllFollowers({
      id: userId,
      callback: (data) => {
        setAllFollowers({ ids: data ?? [] });
      }
    });
    return unsubscribe;
  }, [setAllFollowers, userId]);
};
