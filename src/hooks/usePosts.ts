import { useQuery } from "@tanstack/react-query";
import { viewPost } from "../api/feed";
import { staleTimeForList } from "../utils/constants";

export const usePosts = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => viewPost(userId as string),
    enabled: !!userId,
    staleTime: staleTimeForList,
  });
};
