import { useEffect } from "react";
import { checkAllFollowers } from "@/features/user/api";
import { useAllFollowers } from "@/features/user/store";

export const useWatchAllFollowers = (userId) => {
  const [, setAllFollowers] = useAllFollowers();

  useEffect(() => {
    const unsubscribe = checkAllFollowers({
      id: userId,
      callback: (data) => {
        if (!data) return;
        setAllFollowers({ ids: data });
      }
    });
    return () => unsubscribe();
  }, [setAllFollowers, userId])
};
