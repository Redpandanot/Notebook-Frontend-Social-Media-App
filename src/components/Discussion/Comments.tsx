import { useState } from "react";
import { Comments as CommentType } from "../../Types/type";

interface propType {
  item: CommentType;
  parentId: string;
  setParentId: React.Dispatch<React.SetStateAction<string>>;
  postId: string;
  handleComment: (
    e: React.FormEvent<HTMLFormElement>,
    comment: string,
    postId: string
  ) => Promise<void>;
}

const Comments = ({
  item,
  parentId,
  setParentId,
  postId,
  handleComment,
}: propType) => {
  const [reply, setReply] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      key={item._id}
      className={`border-1 mb-2 collapse ${
        isOpen ? "collapse-open" : "collapse-close"
      }`}
    >
      <div className="collapse-title">
        <div className="flex items-center">
          <div className="pr-2">
            <img
              className="w-5 rounded-full"
              src={item.userId.photo?.url}
              alt="Profile Avatar"
            />
          </div>
          <h3 className="font-bold">
            {item.userId.firstName} {item.userId.lastName}
          </h3>
        </div>
        <h4>{item.comment}</h4>
        <div>
          <button
            className="hover:cursor-pointer hover:text-blue-400 mr-5 underline"
            onClick={() => {
              setReply("");
              setParentId(item._id);
            }}
          >
            reply
          </button>
          {item.replies.length > 0 && (
            <button
              className="hover:cursor-pointer hover:text-blue-400 underline"
              onClick={toggleCollapse}
            >
              {item.replies.length} more reply
            </button>
          )}
          {parentId === item._id && (
            <div className="border-2 p-5">
              <h2 className="card-title">Add Reply</h2>
              <form onSubmit={(e) => handleComment(e, reply, postId)}>
                <textarea
                  className="input border-1 w-full"
                  placeholder="Type here"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <input type="submit" value="Submit" className="btn mt-2" />
              </form>
              <button
                className="hover:cursor-pointer hover:text-red-400"
                onClick={() => setParentId("")}
              >
                cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="collapse-content">
        {item.replies.length > 0 &&
          item.replies.map((replyItem) => (
            <Comments
              key={replyItem._id}
              item={replyItem}
              parentId={parentId}
              setParentId={setParentId}
              postId={postId}
              handleComment={handleComment}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
