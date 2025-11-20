import axiosClient from "./client";

export const fetchPost = async (postId: string) => {
  const res = await axiosClient.get(`/post/view/${postId}`);
  return res.data;
};

export const viewPost = async (profileId: string) => {
  const res = await axiosClient.get("/posts/view/" + profileId + "?limit=10");
  return res.data.posts;
};

export const fetchComments = async (postId: string) => {
  const res = await axiosClient.get(`/discussion/${postId}`);
  return res.data;
};

export const commentRequest = async (
  postId: string,
  parentId: string,
  comment: string
) => {
  const res = await axiosClient.post(`/posts/comment/${postId}`, {
    parentId: parentId ? parentId : null,
    comment,
  });

  return res.data;
};

export const fetchFeed = async (limit: number, pageParam: number = 1) => {
  const result = await axiosClient.get(
    `/posts/feed?limit=${limit}&page=${pageParam}`
  );
  return result.data;
};

export const createPost = async (formData: FormData) => {
  const res = await axiosClient.post("/post/create", formData);
  return res.data;
};

export const updateLike = async (postId: string) => {
  const res = await axiosClient.post("/posts/like/" + postId);
  return res.data;
};
