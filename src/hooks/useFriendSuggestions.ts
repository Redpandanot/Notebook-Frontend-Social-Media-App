import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNewFriendsListRequest } from "../api/connection";

const useFriendSuggestions = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["friendSuggestions"],
    queryFn: ({ pageParam }) => fetchNewFriendsListRequest(limit, pageParam),
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

export default useFriendSuggestions;
