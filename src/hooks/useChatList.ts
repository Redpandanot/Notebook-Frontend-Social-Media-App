import { useQuery } from "@tanstack/react-query";
import { getAllChats } from "../api/chat";

const useChatList = () => {
  return useQuery({
    queryKey: ["getAllChats"],
    queryFn: getAllChats,
  });
};

export default useChatList;
