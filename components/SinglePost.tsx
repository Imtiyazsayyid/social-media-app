"use client";

import { likePost, postComment } from "@/lib/actions/user.actions";
import { Post, User } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import CommentBox from "./CommentBox";
import { Comment } from "@prisma/client";
import CommentModal from "./CommentModal";
import { Spinner } from "./ui/spinner";

interface Props {
  post: Post & {
    user: User;
    comments: Comment & { user: User }[];
  };
  userId: string;
  refetch: () => void;
}

const SinglePost = ({ post, userId, refetch }: Props) => {
  const isLiked = post.likeUserIds.find((id) => id === userId) ? true : false;

  const [liked, setLiked] = useState(isLiked);
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    const newLiked = !isLiked;
    console.log({ newLiked });

    setLiked(newLiked);
    await likePost(post.id, newLiked);
  };

  const handleComment = async (commentText: string) => {
    await postComment(post.id, commentText);
    setComment("");
    await refetch();
  };

  if (!post || !userId)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner className="text-white" />
      </div>
    );

  return (
    <div className="min-h-[40rem] h-[40rem] w-full lg:w-full xl:w-2/3 flex flex-col lg:flex-row rounded-lg overflow-hidden shadow-lg bg-dark-400">
      <div className="w-full lg:w-1/2 lg:h-full h-1/2">
        <img src={post.url} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-10 py-4 pb-10">
        <div className="flex flex-col justify-center h-1/6 gap-5">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex gap-2 items-center">
              <img src={post.user.profileImg} alt="" className="h-6 w-6 lg:h-10 lg:w-10 rounded-full" />
              <h1 className="text-xl lg:text-2xl font-bold text-white">@{post.user.username}</h1>
            </div>
            <div className="flex gap-2">
              <div className="cursor-pointer">
                <CommentModal comment={comment} setComment={setComment} onSubmit={(val) => handleComment(val)} />
              </div>
              <div className="cursor-pointer" onClick={handleLike}>
                <HeartIcon fill={liked ? "#e11d48" : "#363A3D"} stroke={liked ? "0" : "2"} />
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="h-5/6 rounded-lg bg-dark-300 mt-4 lg:mt-0 flex flex-col gap-2 p-2 overflow-hidden overflow-y-auto">
          {post.comments.map((c, i) => (
            <CommentBox key={i} comment={c as Comment & { user: User }} user={c.user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
