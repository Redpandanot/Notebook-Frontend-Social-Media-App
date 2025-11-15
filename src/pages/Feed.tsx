import { useEffect } from "react";
import Posts from "../components/Posts/Posts";
import NewFriends from "../components/FriendAndRequest/NewFriends";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import CreatePost from "../components/Posts/CreatePost";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";
import { Outlet, useOutlet, useOutletContext } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { OutletType, Post } from "../Types/type";

const Feed = () => {
  const { mainScrollRef } = useOutletContext<OutletType>();

  const [ref, inView] = useInView({
    root: mainScrollRef?.current,
    rootMargin: "500px",
    threshold: 0,
  });

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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <ProfilePostSkeleton />;
  }

  if (error) {
    return "Something went wrong";
  }

  return (
    <div className=" flex justify-center m-5">
      {!outlet ? (
        <div>
          <div className="flex flex-col items-center w-full">
            <CreatePost handlePostCreation={handleCreatePost} />
          </div>
          <button
            className="btn btn-primary mb-5 rounded-xl bg-primary flex justify-center w-full"
            onClick={() =>
              (
                document.getElementById("my_modal_1") as HTMLDialogElement
              )?.showModal()
            }
          >
            Create Post
          </button>
          <div className="flex flex-col items-center">
            {data?.pages.map((posts) => {
              return posts.map((post: Post) => {
                return <Posts key={post._id} postObject={post} />;
              });
            })}
            {hasNextPage ? (
              <button
                ref={ref}
                className="btn w-30"
                onClick={() => fetchNextPage()}
              >
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
