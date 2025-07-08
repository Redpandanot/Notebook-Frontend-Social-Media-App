import Posts from "../components/Posts/Posts";
import RequestList from "../components/FriendAndRequest/RequestList";
import NewFriends from "../components/FriendAndRequest/NewFriends";
import FriendsList from "../components/FriendAndRequest/FriendsList";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Post } from "../components/FriendAndRequest/type";
import CreatePost from "../components/CreatePost";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";
import FollowersList from "../components/FollowerAndFollowee/FollowersList";
import FollowingList from "../components/FollowerAndFollowee/FollowingList";
import { Outlet, useOutlet } from "react-router-dom";

const Feed = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [noNewPosts, setNoNewPosts] = useState<boolean>(false);
  const [feed, setFeed] = useState<Post[]>([]);
  const outlet = useOutlet();

  const [limitAndPagePosts, setLimitAndPagePosts] = useState([3, 1]);

  const postFetch = useCallback(async () => {
    const isFirst = limitAndPagePosts[1] === 1;
    if (isFirst) setInitialLoading(true);
    setPostLoading(true);
    try {
      const result = await axios.get(
        BASE_URL +
          "/posts/feed?limit=" +
          limitAndPagePosts[0] +
          "&page=" +
          limitAndPagePosts[1],
        {
          withCredentials: true,
        }
      );
      if (result.data.length > 0) {
        if (isFirst) {
          setFeed([...result.data]);
        } else {
          setFeed((prev) => [...prev, ...result.data]);
        }
      } else {
        setNoNewPosts(true);
      }
    } catch (error) {
      window.alert("from feed" + error);
    } finally {
      setPostLoading(false);
      setInitialLoading(false);
    }
  }, [limitAndPagePosts]);

  useEffect(() => {
    postFetch();
  }, [postFetch]);

  const handleCreatePost = async (
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
      await axios.post(BASE_URL + "/post/create", formData, {
        withCredentials: true,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  if (initialLoading) {
    return <ProfilePostSkeleton />;
  }

  return (
    <div className=" flex justify-center m-5">
      <div className=" hidden xl:block">
        <FriendsList />
        <FollowersList />
        <FollowingList />
      </div>
      <div className=" flex justify-center w-full">
        {!outlet ? (
          <div>
            <div className="flex flex-col items-center w-full">
              <CreatePost handlePostCreation={handleCreatePost} />
            </div>
            <button
              className="btn btn-primary mb-5 sm:w-[600px] rounded-xl bg-primary"
              onClick={() =>
                (
                  document.getElementById("my_modal_1") as HTMLDialogElement
                )?.showModal()
              }
            >
              Create Post
            </button>
            <div className="flex flex-col items-center">
              <Posts feed={feed} />
              {!noNewPosts ? (
                !postLoading ? (
                  <button
                    className="btn w-20"
                    onClick={() =>
                      setLimitAndPagePosts([
                        limitAndPagePosts[0],
                        limitAndPagePosts[1] + 1,
                      ])
                    }
                  >
                    More...
                  </button>
                ) : (
                  <span className="loading loading-ring loading-xl m-auto"></span>
                )
              ) : (
                <div>No More Feed to show</div>
              )}
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <div className=" hidden xl:block">
        <RequestList />
        <NewFriends />
      </div>
    </div>
  );
};

export default Feed;
