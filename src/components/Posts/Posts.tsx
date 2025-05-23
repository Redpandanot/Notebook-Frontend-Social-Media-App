import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Post } from "../FriendAndRequest/type";
import { useState } from "react";

interface PostListProp {
  feed: Post[];
}

const Posts: React.FC<PostListProp> = ({ feed }) => {
  const [posts, setPosts] = useState<Post[]>(feed);

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
      setPosts((prev) => {
        let currPost = prev.filter((item) => item._id === postId);
        let updatePost = { ...currPost, likeCount: currPost[0].likeCount + 1 };
        console.log(currPost);

        console.log(updatePost);
        return feed;
      });
    } catch (error) {
      window.alert("like unsuccessfull" + error);
    }
  };

  return (
    <>
      {feed.map((item) => (
        <div key={item._id} className="card bg-base-100 w-5/12 shadow-sm mb-5">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-6 m-3 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
            <h2 className="card-title">
              {item.userId.firstName} {item.userId.lastName}
            </h2>
          </div>
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body" key={item._id}>
            <h2 className="card-title">{item.title}</h2>
            <p>{item.description}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => updateLike(item._id)}
              >
                {item.likeCount} {item.likeCount > 1 ? "Likes" : "Like"}
              </button>
              <button className="btn btn-primary">
                Comment {item.commentCount}
              </button>
              <button className="btn btn-primary">Share</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
