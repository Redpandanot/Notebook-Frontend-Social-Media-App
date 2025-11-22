import axiosClient from "./client";

export const viewProile = async (userId: string) => {
  const res = await axiosClient.get("/profile/" + userId);
  return res.data;
};

export const updateProfileImage = async (formData: FormData) => {
  const res = await axiosClient.post("/profile/image", formData);
  return res.data;
};

export const updateProfile = async (editedState: Record<string, any>) => {
  const res = await axiosClient.post("/profile/edit", {
    ...editedState,
  });
  return res.data;
};
