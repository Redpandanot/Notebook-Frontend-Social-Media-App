import { useParams } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UploadImages from "../components/UploadImages/UploadImages";
import { handleVisitProfile } from "../utils/handleVisitProfile";
import { Post, ProfileDetail } from "../Types/type";
import { useAppSelector } from "../store/hooks";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";

const Profile = () => {
  const { userId } = useParams();
  const profile = useAppSelector((state) => state.profile);
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [user, setUser] = useState<ProfileDetail | null>(null);
  const [posts, setPosts] = useState([]);

  const postFetch = useCallback(
    async (profileId: string) => {
      try {
        setPostLoading(true);
        const result = await axios.get(
          BASE_URL + "/posts/view/" + profileId + "?limit=10",
          {
            withCredentials: true,
          }
        );
        setPosts(result.data);
        setPostLoading(false);
      } catch (error) {
        setPostLoading(false);
        window.alert("from feed" + error);
      }
    },
    [setPostLoading]
  );

  const profileFetch = useCallback(async (userId: string) => {
    const response = await handleVisitProfile(userId);
    setUser(response.data);
  }, []);

  const handleUpdateProfileImage = async (file: File | null) => {
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
    if (userId) {
      profileFetch(userId);
      postFetch(userId);
    } else {
      if (profile) postFetch(profile._id);
    }

    return () => setPosts([]);
  }, [postFetch, profile, userId, profileFetch]);

  if (!user) {
    return <ProfilePostSkeleton />;
  }

  return (
    <div className="flex flex-col justify-center w-full">
      <div>
        <div>
          {user && (
            <div className="flex justify-center mt-5">
              <div className="card bg-base-100 w-96 shadow-sm">
                <figure className="px-10 pt-10">
                  <img
                    src={user.photo.url}
                    alt="Profile Avatar"
                    className="rounded-xl"
                  />
                </figure>
                {editProfile && (
                  <UploadImages handleImage={handleUpdateProfileImage} />
                )}
                {profile && user._id === profile._id && (
                  <button
                    className="btn btn-primary mt-3 w-40 m-auto"
                    onClick={() => setEditProfile(!editProfile)}
                  >
                    {editProfile ? "Cancel" : "Edit Profile Image"}
                  </button>
                )}
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
                      {user.college ? user.college : "Not Entered"}
                    </p>
                  </div>
                  <div className="mt-4 text-left w-full">
                    <h3 className="text-md font-semibold mb-1">About:</h3>
                    <p className="text-sm text-gray-600">
                      {user.about ? user.about : "Not Entered"}
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
                    Last Updated:{" "}
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          {!user && (
            <div className="flex justify-center mt-5">
              <p className="text-lg text-gray-600">
                Loading profile or no user found...
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-medium mt-10 mb-10">Posts</h1>
          {postLoading ? (
            <span className="loading loading-ring loading-xl m-auto"></span>
          ) : null}
          {posts.map((post: Post) => {
            return <Posts key={post._id} postObject={post} />;
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
