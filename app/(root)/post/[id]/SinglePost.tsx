"use client";

import { Separator } from "@/components/ui/separator";
import { likePost } from "@/lib/actions/user.actions";
import { Post, User } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  post: Post & {
    user: User;
  };
  userId: string;
}

const SinglePost = ({ post, userId }: Props) => {
  const isLiked = post.likeUserIds.find((id) => id === userId) ? true : false;
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    const newLiked = !isLiked;
    setLiked(newLiked);
    await likePost(post.id, newLiked);
  };

  return (
    <div className="min-h-[40rem] h-[40rem] w-full lg:w-full xl:w-2/3 flex flex-col lg:flex-row rounded-lg overflow-hidden shadow-lg bg-dark-400">
      <div className="w-full lg:w-1/2 lg:h-full h-1/2">
        <img src={post.url} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-10 py-4 pb-10">
        <div className="flex flex-col justify-center h-1/6 gap-5">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex gap-2 items-center">
              <img
                src={post.user.profileImg}
                alt=""
                className="h-6 w-6 lg:h-10 lg:w-10 rounded-full"
              />
              <h1 className="text-xl lg:text-2xl font-bold text-white">
                @{post.user.username}
              </h1>
            </div>
            <div className="cursor-pointer" onClick={handleLike}>
              <HeartIcon
                fill={liked ? "#e11d48" : "#363A3D"}
                stroke={liked ? "0" : "2"}
              />
            </div>
          </div>

          <Separator className="border border-dark-500" />
        </div>

        {/* Comments */}
        <div className="h-5/6 rounded-lg bg-dark-300 mt-4 lg:mt-0"></div>
      </div>
    </div>
  );
};

export default SinglePost;
