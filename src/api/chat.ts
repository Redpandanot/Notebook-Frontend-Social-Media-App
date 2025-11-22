import axiosClient from "./client";

export const getAllChats = async () => {
  const res = await axiosClient.get("/chats?limit=10");
  return res.data;
};
