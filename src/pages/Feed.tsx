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
import { Followers, User } from "../components/FriendAndRequest/type";
import CreatePost from "../components/CreatePost";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";
import FollowersList from "../components/FollowerAndFollowee/FollowersList";
import FollowingList from "../components/FollowerAndFollowee/FollowingList";

const Feed = () => {
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [friendsListLoading, setFriendsListLoading] = useState<boolean>(true);
  const [friendsList, setFriendsList] = useState<User[]>([]);
  const [followersList, setFollowersList] = useState<Followers[]>([]);
  const [followingList, setFollowingList] = useState<Followers[]>([]);
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

  const followersListFetch = useCallback(async () => {
    try {
      const response = await axios.get(BASE_URL + "/followers", {
        withCredentials: true,
      });
      setFollowersList(response.data);
    } catch (error) {
      window.alert(error);
    }
  }, [setFollowersList]);

  const FollowersListFetch = useCallback(async () => {
    try {
      const response = await axios.get(BASE_URL + "/following", {
        withCredentials: true,
      });
      setFollowingList(response.data);
    } catch (error) {
      window.alert(error);
    }
  }, [setFollowingList]);

  const handleCreatePost = async (
    files: File[],
    title: string,
    description: string
  ) => {
    if (!title || !description) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (files.length > 0) {
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

  useEffect(() => {
    followersListFetch();
  }, [followersListFetch]);

  useEffect(() => {
    FollowersListFetch();
  }, [FollowersListFetch]);

  if (postLoading) {
    return <ProfilePostSkeleton />;
  }

  return (
    <div className=" flex justify-evenly">
      <div className=" hidden xl:block">
        {!friendsListLoading && <FriendsList friends={friendsList} />}
        <FollowersList followers={followersList} />
        <FollowingList following={followingList} />
      </div>
      <div className="">
        <div className="flex flex-col items-center w-full">
          {createPost && <CreatePost handleImage={handleCreatePost} />}
        </div>
        <button
          className={`btn btn-primary mb-5 sm:w-[600px] rounded-xl ${
            createPost ? "bg-red-500" : "bg-blue-500"
          }`}
          onClick={() => setCreatePost(!createPost)}
        >
          {createPost ? "Cancel" : "Create Post"}
        </button>
        <Posts feed={feed} />
      </div>
      <div className=" hidden xl:block">
        <RequestList />
        <NewFriends />
      </div>
    </div>
  );
};

export default Feed;
