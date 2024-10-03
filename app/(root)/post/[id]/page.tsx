"use client";

import { Separator } from "@/components/ui/separator";
import { getSinglePost } from "@/lib/actions/post.actions";
import { HeartIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import SinglePost from "../../../../components/SinglePost";
import { useUser } from "@/hooks/useUser";
import { Post, User } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}

const PostPage = ({ params }: Props) => {
  const [post, setPost] = useState<any>();
  const [userId, setUserId] = useState<string>("");

  const fetchSinglePost = async () => {
    const post = await getSinglePost(params.id);
    const { id } = await useUser();

    setPost(post);
    setUserId(id || "");
  };

  useEffect(() => {
    fetchSinglePost();
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <SinglePost post={post} userId={userId} refetch={fetchSinglePost} />
    </div>
  );
};

export default PostPage;
