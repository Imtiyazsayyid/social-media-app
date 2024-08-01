"use client";

import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  post: Post;
  user: User;
}

const ProfilePostCard = ({ post, user }: Props) => {
  const router = useRouter();

  return (
    <div
      className="w-full h-96 rounded-xl overflow-hidden relative cursor-pointer"
      onClick={() => router.push("/post/" + post.id)}
    >
      <div className="absolute bottom-5 right-5 bg-dark-400-opaque-lg rounded-full p-1 pr-5 flex items-center gap-2">
        <img src={user.profileImg} className="h-10 w-10 rounded-full" />
        <h1 className=" text-xl font-bold text-white ">{post.title}</h1>
      </div>
      <img src={post.url} alt="" className="w-full h-full object-cover" />
    </div>
  );
};

export default ProfilePostCard;
