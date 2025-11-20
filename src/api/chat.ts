import axiosClient from "./client";

export const getAllChats = async () => {
  const res = await axiosClient.get("/allChats?limit=10");
  return res.data;
};
