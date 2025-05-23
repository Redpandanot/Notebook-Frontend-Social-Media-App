import axios from "axios";
import { BASE_URL } from "./constants";

export const handleVisitProfile = async (userId: string) => {
  const response = await axios.get(BASE_URL + "/profile/view/" + userId, {
    withCredentials: true,
  });
  return response;
};
