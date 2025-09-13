import { AppDispatch } from "../store/store";
import { ProfileDetail } from "../Types/type";

export const checkAndFetchProfile = async (
  profile: ProfileDetail | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
  getProfile
): Promise<boolean> => {
  if (!profile) {
    setLoading(true);
    await dispatch(getProfile());
    setLoading(false);
    return true;
  } else {
    setLoading(false);
  }
  return false;
};
