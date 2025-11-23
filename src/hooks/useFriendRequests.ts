import { useInfiniteQuery } from "@tanstack/react-query";
import { friendRequests } from "../api/connection";

const useFriendRequests = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["friendRequests"],
    queryFn: ({ pageParam }) => friendRequests(limit, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === limit) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });
};

export default useFriendRequests;
