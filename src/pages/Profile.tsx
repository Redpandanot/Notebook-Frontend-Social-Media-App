import { useParams } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useMutation } from "@tanstack/react-query";
import {
  followRequest,
  friendRequest,
  reviewFriendRequest,
  unFriendRequest,
} from "../api/connection";
import { useProfile } from "../hooks/useProfile";
import { usePosts } from "../hooks/usePosts";
import { FriendRequestStatus } from "../utils/constants";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";
import { ProfileDetail, Post } from "../Types/type";

interface ConnectionStatus {
  followClicked: boolean;
  friendClicked: boolean;
}

const connectionString = (user: ProfileDetail) => {
  let statusString = "Add Friend";

  if (user?.connectionStatus?.status === FriendRequestStatus.Accepted) {
    statusString = "Unfriend";
  } else if (user?.connectionStatus?.fromUserId === user._id) {
    statusString = "Accept Request";
  } else if (user?.connectionStatus?.toUserId === user._id) {
    statusString = "Pending";
  }

  return statusString;
};

const Profile = () => {
  const { userId } = useParams();
  const profile = useAppSelector((state) => state.profile);

  // If viewing own profile
  const finalUserId = userId || profile?._id;

  const { data: user, isLoading: profileLoading } = useProfile(finalUserId);

  const { data: posts = [], isLoading: postLoading } = usePosts(finalUserId);

  const [clicked, setClicked] = useState<ConnectionStatus>({
    followClicked: false,
    friendClicked: false,
  });

  const handleConnect = async (userId: string) => {
    let response;
    if (!user?.connectionStatus) {
      response = await friendRequest(FriendRequestStatus.Requested, userId);
    } else if (user.connectionStatus.status === FriendRequestStatus.Accepted) {
      response = await unFriendRequest(userId);
    } else if (
      user.connectionStatus.fromUserId === userId &&
      user.connectionStatus.status === FriendRequestStatus.Requested
    ) {
      response = await reviewFriendRequest(
        FriendRequestStatus.Accepted,
        user.connectionStatus._id
      );
    }
    return response;
  };

  const connectMutation = useMutation({
    mutationFn: handleConnect,
    onMutate: () => setClicked((prev) => ({ ...prev, friendClicked: true })),
  });

  const followMutation = useMutation({
    mutationFn: followRequest,
    onMutate: () => setClicked((prev) => ({ ...prev, followClicked: true })),
    onSuccess: () => {
      // Optimistic UI update
      if (user) {
        user.isFollowing = !user.isFollowing;
      }
    },
    onSettled: () => setClicked((prev) => ({ ...prev, followClicked: false })),
  });

  if (profileLoading) return <ProfilePostSkeleton />;

  if (!user) {
    return (
      <p className="text-center mt-5 text-lg text-gray-600">
        User not found...
      </p>
    );
  }

  return (
    <div className="flex flex-col justify-center w-full">
      <div>
        <div className="flex justify-center mt-5">
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-10 pt-10">
              <img
                src={user.photo?.url}
                alt="Profile Avatar"
                className="rounded-xl"
              />
            </figure>

            {/* Follow & Friend Buttons */}
            {profile?._id !== user._id && (
              <div className="flex justify-center gap-2">
                {/* FRIEND BUTTON */}
                <button
                  className="btn btn-primary mt-3 w-30"
                  onClick={() => {
                    if (
                      !(
                        user?.connectionStatus?.fromUserId === profile?._id &&
                        user.connectionStatus?.status ===
                          FriendRequestStatus.Requested
                      )
                    ) {
                      connectMutation.mutate(user._id);
                    }
                  }}
                  disabled={clicked.friendClicked}
                >
                  {connectionString(user)}
                </button>

                {/* FOLLOW BUTTON */}
                <button
                  className="btn btn-primary mt-3 w-30"
                  onClick={() => followMutation.mutate(user._id)}
                  disabled={clicked.followClicked}
                >
                  {user.isFollowing ? "UnFollow" : "Follow"}
                </button>
              </div>
            )}

            {/* PROFILE DETAILS */}
            <div className="card-body items-start text-center">
              <h2 className="card-title mb-2">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {user.emailId}
              </p>

              {user.age !== undefined && user.age !== null && (
                <p className="text-sm text-gray-700">
                  <strong>Age:</strong> {user.age}
                </p>
              )}

              {user.gender && (
                <p className="text-sm text-gray-700">
                  <strong>Gender:</strong> {user.gender}
                </p>
              )}

              <div className="mt-4 text-left w-full">
                <h3 className="text-md font-semibold mb-1">
                  College/University:
                </h3>
                <p className="text-sm text-gray-600">
                  {user.college || "Not Entered"}
                </p>
              </div>

              <div className="mt-4 text-left w-full">
                <h3 className="text-md font-semibold mb-1">About:</h3>
                <p className="text-sm text-gray-600">
                  {user.about || "Not Entered"}
                </p>
              </div>

              <div className="mt-4 text-left w-full">
                <h3 className="text-md font-semibold mb-1">Skills:</h3>
                <p className="text-sm text-gray-600">
                  {user.skills.length > 0
                    ? user.skills.join(", ")
                    : "Not Entered"}
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>

              <p className="text-xs text-gray-500">
                Last Updated: {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* POSTS SECTION */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-medium mt-10 mb-10">Posts</h1>

          {postLoading && (
            <span className="loading loading-ring loading-xl m-auto"></span>
          )}

          {posts.map((post: Post) => (
            <Posts key={post._id} postObject={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
