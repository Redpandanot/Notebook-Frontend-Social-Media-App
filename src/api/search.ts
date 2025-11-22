import axiosClient from "./client";

export const searchRequest = async (searchQuery: string) => {
  const res = await axiosClient.get(`/search?query=${searchQuery}`);
  return res.data;
};

export const searchList = async (searchQuery: string) => {
  const res = await axiosClient.get(`/search/all?query=${searchQuery}`);
  return res.data;
};
