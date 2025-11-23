import { useEffect } from "react";
import Posts from "../components/Posts/Posts";
import NewFriends from "../components/FriendAndRequest/NewFriends";
import CreatePost from "../components/Posts/CreatePost";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";
import { Outlet, useOutlet, useOutletContext } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { OutletType, Post } from "../Types/type";
import { handleCreatePost } from "../utils/helperFunctions";
import useFeed from "../hooks/useFeed";
import { feedLimit } from "../utils/constants";

const Feed = () => {
  const { mainScrollRef } = useOutletContext<OutletType>();

  const [ref, inView] = useInView({
    root: mainScrollRef?.current,
    rootMargin: "500px",
    threshold: 0,
  });

  const outlet = useOutlet();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useFeed(feedLimit);

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
