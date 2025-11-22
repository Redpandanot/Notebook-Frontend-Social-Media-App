import { createPost } from "../api/feed";
import { AppDispatch } from "../store/store";
import { ProfileDetail } from "../Types/type";

export const formatDateHeader = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); // e.g., "Wed, 16 Jul 2025"
};

export const handleCreatePost = async (
  files: File[],
  title: string,
  description: string
) => {
  if (
    !title ||
    !description ||
    title.length < 3 ||
    title.length > 75 ||
    description.length < 3 ||
    description.length > 75
  )
    return;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);

  if (files.length > 0) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }
  (document.getElementById("my_modal_1") as HTMLDialogElement)?.close();
  try {
    await createPost(formData);
  } catch (error) {
    window.alert(error);
  }
};

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
