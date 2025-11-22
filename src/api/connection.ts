import axiosClient from "./client";

export const friendRequest = async (action: string, userId: string) => {
  const res = await axiosClient.post(
    `/friend-request/${action}/${userId}`,
    null
  );

  return res.data;
};

export const unFriendRequest = async (userId: string) => {
  const res = await axiosClient.post(`/unfriend/review/${userId}`, null);
  return res.data;
};

export const reviewFriendRequest = async (
  action: string,
  requestId: string
) => {
  const res = await axiosClient.post(
    `/friend-requests/${action}/${requestId}`,
    null
  );
  return res.data;
};

export const followRequest = async (userId: string) => {
  const res = await axiosClient.post(`/follow/${userId}`);
  return res.data;
};

export const followersListRequest = async (limit: number, pageParam = 1) => {
  const res = await axiosClient.get(
    `/followers?limit=${limit}&page=${pageParam}`
  );
  return res.data;
};

export const followingListRequest = async (limit: number, pageParam = 1) => {
  const res = await axiosClient.get(
    `/following?limit=${limit}&page=${pageParam}`
  );
  return res.data;
};

export const friendsListRequest = async (limit: number, pageParam = 1) => {
  const response = await axiosClient.get(
    `/friends-list?limit=${limit}&page=${pageParam}`
  );
  return response.data.friends;
};

export const fetchNewFriendsListRequest = async (
  limit: number,
  pageParam = 1
) => {
  const res = await axiosClient.get(
    `/friend-suggestions?limit=${limit}&page=${pageParam}`
  );
  return res.data;
};

export const friendRequests = async () => {
  const res = await axiosClient.get("/friend-requests/view?limit=5");
  return res.data;
};
