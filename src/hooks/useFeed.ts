import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFeed } from "../api/feed";

const useFeed = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => fetchFeed(limit, pageParam),
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

export default useFeed;
