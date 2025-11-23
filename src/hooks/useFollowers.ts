import { useInfiniteQuery } from "@tanstack/react-query";
import { followersListRequest } from "../api/connection";
import { staleTimeForList } from "../utils/constants";

const useFollowers = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["followers"],
    queryFn: ({ pageParam = 1 }) => followersListRequest(limit, pageParam),
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

export default useFollowers;
