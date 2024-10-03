"use client";

import { getAllPosts } from "@/lib/actions/post.actions";
import SinglePost from "../../components/SinglePost";
import { getUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<any>();
  const [userId, setUserId] = useState<string>("");

  const fetchAllPosts = async () => {
    const posts = await getAllPosts();
    const { id } = await getUser();

    setPosts(posts);
    setUserId(id || "");
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <main className="h-full">
      <div className="flex flex-col gap-10 max-h-full items-center overflow-hidden overflow-y-auto pb-40">
        {posts?.map((p: any) => (
          <SinglePost post={p} key={p.id} userId={userId} refetch={fetchAllPosts} />
        ))}
      </div>
    </main>
  );
}
