import Posts from "../components/Posts/Posts";
import RequestList from "../components/FriendAndRequest/RequestList";
import NewFriends from "../components/FriendAndRequest/NewFriends";
import FriendsList from "../components/FriendAndRequest/FriendsList";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPosts } from "../store/slices/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import { FriendsDetails } from "../components/FriendAndRequest/type";

const Feed = () => {
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [friendsListLoading, setFriendsListLoading] = useState<boolean>(true);
  const [friendsList, setFriendsList] = useState<FriendsDetails[]>([]);
  const feed = useAppSelector((state) => state.feed.posts);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const dispatch = useDispatch();

  const postFetch = useCallback(async () => {
    try {
      setPostLoading(true);
      const result = await axios.get(BASE_URL + "/posts/feed/?limit=10", {
        withCredentials: true,
      });

      dispatch(addPosts(result.data));
      setPostLoading(false);
    } catch (error) {
      window.alert("from feed" + error);
    }
  }, [dispatch, setPostLoading]);

  useEffect(() => {
    postFetch();
  }, [postFetch]);

  const friendsListFetch = useCallback(async () => {
    try {
      setFriendsListLoading(true);
      const response = await axios.get(BASE_URL + "/friends-list", {
        withCredentials: true,
      });

      setFriendsList(response.data);
      setFriendsListLoading(false);
    } catch (error) {
      setFriendsListLoading(false);
      window.alert(error);
    }
  }, [setFriendsListLoading]);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);

      // Create a FileReader to read the file
      const reader = new FileReader();
      // Read the file as a Data URL
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // When the file is loaded, set the result (Data URL) to the imagePreviewUrl state
        setImagePreviewUrl(reader.result as string);
      };
    } else {
      // Clear the input and preview if no file is selected
      setFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleCreatePost = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        BASE_URL + "/profile/addImage",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    friendsListFetch();
  }, [friendsListFetch]);

  return (
    <div className="flex flex-col">
      <div className="absolute left-0 mt-3 ml-10">
        {!friendsListLoading && <FriendsList friends={friendsList} />}
      </div>
      <div className="flex flex-col justify-center items-center mt-3">
        <input
          type="file"
          className="file-input file-input-accent"
          onChange={handleFileInput}
          accept="image/*"
        />
        {imagePreviewUrl && (
          <div className="mt-4 p-2 border border-base-300 rounded-lg">
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className="max-w-xs max-h-48 rounded-md shadow-md"
            />
            {/* Optional: Add a button to clear the preview/selected file */}
            <button
              className="btn btn-sm btn-error mt-2"
              onClick={() => {
                setFile(null);
                setImagePreviewUrl(null);
                // Reset the file input value to allow selecting the same file again
                const fileInputElement = document.querySelector(
                  ".file-input"
                ) as HTMLInputElement;
                if (fileInputElement) {
                  fileInputElement.value = "";
                }
              }}
            >
              Clear Image
            </button>
          </div>
        )}
        <button type="submit" onClick={handleCreatePost}>
          Submit
        </button>
        {!postLoading ? (
          <Posts feed={feed} />
        ) : (
          <span className="loading loading-ring loading-xl"></span>
        )}
      </div>
      <div className="absolute right-0 mt-3 mr-10">
        <RequestList />
        <NewFriends />
      </div>
    </div>
  );
};

export default Feed;
