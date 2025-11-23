import { useQuery } from "@tanstack/react-query";
import { searchRequest } from "../api/search";

export const useSearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchRequest(searchQuery),
    enabled: false,
  });
};
