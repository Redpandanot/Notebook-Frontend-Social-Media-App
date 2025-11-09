import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, FriendRequestStatus } from "../../utils/constants";
import { FriendRequest, OutletType } from "../../Types/type";
import Card from "./Card";
import { useOutletContext } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import ProfileCardSkeleton from "../Skeleton/ProfileCardSkeleton";

const RequestList = () => {
  const [clicked, setClicked] = useState<
    { id: string; status: FriendRequestStatus }[]
  >([]);
  const { mainScrollRef } = useOutletContext<OutletType>();
  const queryClient = useQueryClient();

  const [ref, inView] = useInView({
    root: mainScrollRef?.current,
    rootMargin: "500px",
    threshold: 0,
  });

  const LIMIT = 10;

  const friendRequests = async () => {
    const result = await axios.get(BASE_URL + "/friend-requests/view?limit=3", {
      withCredentials: true,
    });

    return result.data;
  };

  const handleConnection = async ({
    requestId,
    status,
  }: {
    requestId: string;
    status: string;
  }) => {
    const response = await axios.post(
      BASE_URL + "/friend-requests/review/" + status + "/" + requestId,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["friendRequests"],
    queryFn: friendRequests,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === LIMIT) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

  const friendRequestMutation = useMutation({
    mutationFn: handleConnection,
    onMutate: async ({
      requestId,
      status,
    }: {
      requestId: string;
      status: FriendRequestStatus;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["friendRequests"] });

      const previousData = queryClient.getQueryData(["friendRequests"]);

      queryClient.setQueryData(["friendRequests"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: FriendRequest[]) =>
            page.map((req) =>
              req._id === requestId ? { ...req, status } : req
            )
          ),
        };
      });

      return { previousData };
    },

    onError: (_err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["friendRequests"], context.previousData);
      }
      setClicked((prev) => prev.filter((c) => c.id !== variables.requestId));
    },
    //adding this line will remove the accepted/rejected items
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    // },
  });

  const handleClick = (requestId: string, status: FriendRequestStatus) => {
    setClicked((prev) => [...prev, { id: requestId, status }]);
    friendRequestMutation.mutate({ requestId, status });
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="mb-10 flex flex-col items-center">
        <ProfileCardSkeleton />
      </div>
    );
  }

  if (error) {
    return "Something went wrong";
  }

  return (
    <div className="mb-10 flex flex-col items-center">
      <h1 className="text font-bold mb-1">Requests</h1>
      {data?.pages.map((page) => {
        return page.map((request: FriendRequest) => {
          return (
            <div
              key={request._id}
              className="card bg-base-100 w-72 shadow-sm mb-3"
            >
              <div className="card-body">
                <Card
                  _id={request.fromUserId._id}
                  firstName={request.fromUserId.firstName}
                  lastName={request.fromUserId.lastName}
                  photo={request.fromUserId.photo}
                />
                <div className="flex gap-5">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleClick(request._id, FriendRequestStatus.Accepted)
                    }
                    disabled={clicked.some((c) => c.id === request._id)}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-error"
                    onClick={() =>
                      handleClick(request._id, FriendRequestStatus.Rejected)
                    }
                    disabled={clicked.some((c) => c.id === request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        });
      })}
      {hasNextPage ? (
        <button ref={ref} className="btn w-30" onClick={() => fetchNextPage()}>
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
  );
};

export default RequestList;
