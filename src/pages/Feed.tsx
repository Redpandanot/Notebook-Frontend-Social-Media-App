import Posts from "../components/Posts/Posts";
import RequestList from "../components/FriendAndRequest/RequestList";
import NewFriends from "../components/FriendAndRequest/NewFriends";
import FriendsList from "../components/FriendAndRequest/FriendsList";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPosts } from "../store/slices/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useAppSelector } from "../store/hooks";
import { FriendsDetails } from "../components/FriendAndRequest/type";
import CreatePost from "../components/CreatePost";

const Feed = () => {
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [friendsListLoading, setFriendsListLoading] = useState<boolean>(true);
  const [friendsList, setFriendsList] = useState<FriendsDetails[]>([]);
  const feed = useAppSelector((state) => state.feed.posts);
  const dispatch = useDispatch();
  const [createPost, setCreatePost] = useState<boolean>(false);

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

  const handleCreatePost = async (
    files: File[] | null,
    title: string,
    description: string
  ) => {
    if (!title || !description) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (files) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    }
    try {
      await axios.post(BASE_URL + "/post/create", formData, {
        withCredentials: true,
      });
      setCreatePost(false);
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    friendsListFetch();
  }, [friendsListFetch]);

  return (
    <div className="flex flex-col">
      <div className="absolute left-0 mt-3 ml-10 hidden xl:block">
        {!friendsListLoading && <FriendsList friends={friendsList} />}
      </div>
      <div className="flex flex-col items-center mt-5">
        <div className="flex flex-col items-center w-full">
          {createPost && <CreatePost handleImage={handleCreatePost} />}
        </div>
        <button
          className={`btn btn-primary mb-5 w-10/12 md:w-5/12 rounded-xl ${
            createPost ? "bg-red-500" : "bg-blue-500"
          }`}
          onClick={() => setCreatePost(!createPost)}
        >
          {createPost ? "Cancel" : "Create Post"}
        </button>
        {!postLoading ? (
          <Posts feed={feed} />
        ) : (
          <span className="loading loading-ring loading-xl"></span>
        )}
      </div>
      <div className="absolute right-0 mt-3 mr-10 hidden xl:block">
        <RequestList />
        <NewFriends />
      </div>
    </div>
  );
};

export default Feed;
