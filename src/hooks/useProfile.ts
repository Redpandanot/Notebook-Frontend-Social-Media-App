import { useQuery } from "@tanstack/react-query";
import { QueryKeys, staleTimeForList } from "../utils/constants";
import { viewProile } from "../api/profile";

export const useProfile = (userId?: string) => {
  return useQuery({
    queryKey: [QueryKeys.Profile, userId],
    queryFn: () => viewProile(userId as string),
    enabled: !!userId,
    staleTime: staleTimeForList,
  });
};
