import { Separator } from "@/components/ui/separator";
import { getSinglePost } from "@/lib/actions/post.actions";
import { HeartIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import SinglePost from "./SinglePost";

interface Props {
  params: {
    id: string;
  };
}

const PostPage = async ({ params }: Props) => {
  const post = await getSinglePost(params.id);
  if (!post) redirect("/");

  return (
    <div className="flex justify-center items-center h-full">
      <SinglePost post={post} />
    </div>
  );
};

export default PostPage;
