import { Separator } from "@/components/ui/separator";
import { getSinglePost } from "@/lib/actions/post.actions";
import { HeartIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import SinglePost from "../../../../components/SinglePost";
import { useUser } from "@/hooks/useUser";

interface Props {
  params: {
    id: string;
  };
}

const PostPage = async ({ params }: Props) => {
  const post = await getSinglePost(params.id);
  const { id: userId } = await useUser();

  if (!post || !userId) redirect("/");

  return (
    <div className="flex justify-center items-center h-full">
      <SinglePost post={post} userId={userId} />
    </div>
  );
};

export default PostPage;
