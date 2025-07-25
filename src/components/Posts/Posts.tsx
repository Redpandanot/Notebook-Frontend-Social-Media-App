import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Post } from "../../Types/type";
import { useEffect, useState } from "react";
import Carousel from "../Carousel";
import { useNavigate } from "react-router-dom";

interface PostListProp {
  feed: Post[];
  isCommentDisplayed?: boolean;
}

const Posts: React.FC<PostListProp> = ({ feed, isCommentDisplayed = true }) => {
  const [posts, setPosts] = useState<Post[]>(feed);
  const navigate = useNavigate();

  const updateLike = async (postId: string) => {
    //may be use react query
    try {
      const response = await axios.post(
        BASE_URL + "/posts/like/" + postId,
        null,
        {
          withCredentials: true,
        }
      );

      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post._id === postId) {
            return { ...post, likeCount: response.data.likeCount };
          }
          return post;
        });
      });
    } catch (error) {
      window.alert("like unsuccessfull" + error);
    }
  };

  const handleVisitPost = (post: Post) => {
    navigate("/postDiscussion/" + post._id);
  };

  useEffect(() => {
    setPosts(feed);
  }, [feed]);

  return (
    <>
      {posts.map((post) => (
        <div
          key={post._id}
          className="card bg-base-100 sm:w-[600px] w-full shadow-sm mb-5"
        >
          <div
            className="avatar cursor-pointer"
            onClick={() => navigate("/profile/" + post.userId._id)}
          >
            <div className="w-6 m-3 rounded-full">
              <img src={post.userId.photo.url} />
            </div>
            <h2 className="card-title">
              {post.userId.firstName} {post.userId.lastName}
            </h2>
          </div>
          <div className="divider -mt-2"></div>
          <div className="flex justify-center relative">
            {post.photos && post.photos.length > 0 && (
              <Carousel photos={post.photos} />
            )}
          </div>
          <div className="card-body" key={post._id}>
            <h2 className="card-title">{post.title}</h2>
            <p className="whitespace-pre-wrap">{post.description}</p>
            <div className="card-actions justify-start">
              <button
                className="btn btn-primary"
                onClick={() => updateLike(post._id)}
              >
                {post.likeCount} {post.likeCount > 1 ? "Likes" : "Like"}
              </button>
              {isCommentDisplayed && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleVisitPost(post)}
                >
                  Comment {post.commentCount}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
