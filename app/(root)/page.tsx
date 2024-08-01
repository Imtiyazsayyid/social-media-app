import { getAllPosts } from "@/lib/actions/post.actions";
import SinglePost from "./post/[id]/SinglePost";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="h-full">
      <div className="flex flex-col gap-10 justify-center items-center h-full overflow-hidden overflow-y-auto pt-40">
        {posts?.map((p) => (
          <SinglePost post={p} key={p.id} />
        ))}
      </div>
    </main>
  );
}
