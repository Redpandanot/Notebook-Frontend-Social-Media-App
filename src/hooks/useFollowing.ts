import { useInfiniteQuery } from "@tanstack/react-query";
import { followingListRequest } from "../api/connection";
import { staleTimeForList } from "../utils/constants";

const useFollowing = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["following"],
    queryFn: ({ pageParam }) => followingListRequest(limit, pageParam),
    initialPageParam: 1,
    staleTime: staleTimeForList,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === limit) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });
};

export default useFollowing;
