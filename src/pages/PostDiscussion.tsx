import { useParams } from "react-router-dom";
import Posts from "../components/Posts/Posts";
import { useCallback, useEffect, useState } from "react";
import { Comments as CommentType, Post } from "../Types/type";
import Comments from "../components/Discussion/Comments";
import ProfilePostSkeleton from "../components/Skeleton/ProfilePostSkeleton";
import { commentRequest, fetchComments, fetchPost } from "../api/feed";

const PostDiscussion = () => {
  const { postId } = useParams();
  const [addComment, setAddComment] = useState<string>("");
  const [discussion, setDiscussion] = useState<CommentType[]>([]);
  const [parentId, setParentId] = useState<string>("");
  const [post, setPost] = useState<Post | null>(null);

  const handleComment = async (
    e: React.FormEvent<HTMLFormElement>,
    comment: string,
    postId: string
  ) => {
    e.preventDefault();
    if (comment === "") return;
    try {
      await commentRequest(postId, parentId, comment);
      setAddComment("");
      setParentId("");
      fetchComments(postId);
    } catch (error) {
      window.alert("comment failed" + error);
    }
  };

  const fetchDiscussion = useCallback(async (postId: string) => {
    const post = await fetchPost(postId);
    const comment = await fetchComments(postId);

    setPost(post);
    setDiscussion(comment);
  }, []);

  useEffect(() => {
    if (postId) {
      fetchDiscussion(postId);
    }
  }, [fetchDiscussion, postId]);

  if (!post) {
    return <ProfilePostSkeleton />;
  }

  return (
    <div className="flex flex-col items-center mt-5 mb-5">
      <div>
        <Posts postObject={post} isCommentDisplayed={false} />
      </div>
      <div className="sm:w-[800px] w-full">
        <div className="border-2 p-5">
          <h2 className="card-title">Add Comment</h2>
          <form
            onSubmit={(e) => postId && handleComment(e, addComment, postId)}
          >
            <input
              type="text"
              className="input border-1 w-full"
              placeholder="Type here"
              value={addComment}
              onChange={(e) => setAddComment(e.target.value)}
            />
            <input type="submit" value="Submit" className="btn mt-2" />
          </form>
        </div>
        <div className="border-2 mt-5">
          <h2 className="card-title p-5">Discussion</h2>
          <div className="p-2">
            {discussion.length > 0 ? (
              postId &&
              discussion.map((item) => {
                return (
                  <Comments
                    key={item._id}
                    item={item}
                    parentId={parentId}
                    setParentId={setParentId}
                    postId={postId}
                    handleComment={handleComment}
                  />
                );
              })
            ) : (
              <h3 className="pl-3">Be the first one to start discussion</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDiscussion;
