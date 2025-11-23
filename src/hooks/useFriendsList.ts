import { useInfiniteQuery } from "@tanstack/react-query";
import { friendsListRequest } from "../api/connection";
import { staleTimeForList } from "../utils/constants";

const useFriendsList = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["friends"],
    queryFn: ({ pageParam }) => friendsListRequest(limit, pageParam),
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

export default useFriendsList;
