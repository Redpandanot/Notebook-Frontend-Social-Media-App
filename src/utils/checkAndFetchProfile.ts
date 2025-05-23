import { AppDispatch } from "../store/store";

export const checkAndFetchProfile = async (
  profile: Array<object> | null,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: AppDispatch,
  getProfile
): Promise<boolean> => {
  if (profile === null) {
    setLoading(true);
    try {
      await dispatch(getProfile()).unwrap();
    } catch {
      window.alert("User not logged in, please:");
    } finally {
      setLoading(false);
    }
    return true;
  } else {
    setLoading(false);
  }
  return false;
};
