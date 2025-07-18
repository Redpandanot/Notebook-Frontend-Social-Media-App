import { AppDispatch } from "../store/store";

export const checkAndFetchProfile = async (
  profile: Array<object> | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
  getProfile
): Promise<boolean> => {
  if (profile === null) {
    setLoading(true);
    await dispatch(getProfile());
    setLoading(false);
    return true;
  } else {
    setLoading(false);
  }
  return false;
};
