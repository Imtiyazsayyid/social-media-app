import { getAllPosts } from "@/lib/actions/post.actions";
import SinglePost from "../../components/SinglePost";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";

export default async function Home() {
  const posts = await getAllPosts();
  const { id: userId } = await useUser();

  if (!userId) {
    redirect("/");
  }

  return (
    <main className="h-full">
      <div className="flex flex-col gap-10 max-h-full items-center overflow-hidden overflow-y-auto pb-40">
        {posts?.map((p) => (
          <SinglePost post={p} key={p.id} userId={userId} />
        ))}
      </div>
    </main>
  );
}
