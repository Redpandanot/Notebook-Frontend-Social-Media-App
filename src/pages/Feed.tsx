import Posts from "../components/Posts/Posts";
import NewFriends from "../components/FriendAndRequest/NewFriends";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Post } from "../Types/type";
import { Post } from "../Types/type";
import CreatePost from "../components/CreatePost";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";
import { Outlet, useOutlet } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

const Feed = () => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [noNewPosts, setNoNewPosts] = useState<boolean>(false);
  const [feed, setFeed] = useState<Post[]>([]);
  const outlet = useOutlet();

  const LIMIT = 3;

  const postFetch = async ({ pageParam = 1 }) => {
    const result = await axios.get(
      `${BASE_URL}/posts/feed?limit=${LIMIT}&page=${pageParam}`,
      { withCredentials: true }
    );
    return result.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: postFetch,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === LIMIT) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

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

  if (isLoading) {
    return <ProfilePostSkeleton />;
  }

  return (
    <div className=" flex justify-center m-5">
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
            {data?.pages.map((page, i) => {
              return <Posts key={i} feed={page} />;
            })}
            {hasNextPage ? (
              <button className="btn w-20" onClick={() => fetchNextPage()}>
                {isFetchingNextPage ? (
                  <span className="loading loading-ring loading-xl m-auto"></span>
                ) : (
                  hasNextPage && "Load More"
                )}
              </button>
            ) : (
              "Nothing more to load"
            )}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
      <div className=" absolute right-5 hidden xl:block">
        <NewFriends />
      </div>
    </div>
  );
};

export default Feed;
