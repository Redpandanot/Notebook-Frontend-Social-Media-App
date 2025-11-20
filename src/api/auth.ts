import { LoginPayload, ProfileDetail, SignupPayload } from "../Types/type";
import axiosClient from "./client";

export const login = async (payload: LoginPayload): Promise<ProfileDetail> => {
  const res = await axiosClient.post("/login", payload);
  return res.data;
};

export const signup = async (payload: SignupPayload) => {
  const res = await axiosClient.post("/signup", payload);
  return res.data;
};

export const logout = async () => {
  const res = await axiosClient.get("/logout");
  return res.data;
};
