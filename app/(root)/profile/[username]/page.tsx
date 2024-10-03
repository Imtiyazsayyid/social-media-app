import ProfilePostCard from "@/components/ProfilePostCard";
import { Separator } from "@/components/ui/separator";
import { getAnyUser } from "@/hooks/useUser";
import { getAnyUserPosts } from "@/lib/actions/post.actions";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: Props) => {
  const posts = await getAnyUserPosts({ username: params.username });
  const user = await getAnyUser({ username: params.username });

  if (!user) {
    redirect("/");
  }

  return (
    <div className="h-full overflow-hidden overflow-y-auto">
      <div className="h-1/2 flex justify-center p-10 flex-col items-center border-b border-stone-800">
        <img
          className="rounded-full h-[60px] w-[60px]"
          src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yanNUanY0dWgzaXAyZWZDVlo2dmNNdjJCV1gifQ?width=160"
          alt=""
        />
        <h1 className="text-center text-white text-2xl font-bold mt-5">
          {user.firstName} {user.lastName}
        </h1>
        <h4 className="text-center text-gray-300 text-lg font-semibold">@{user.username}</h4>

        <Separator className="mt-8 w-96" />

        <div className="flex w-96 h-20 mt-5">
          <div className="w-1/3 flex flex-col justify-center items-center border-dashed border-r-2">
            <h1 className="text-6xl font-bold text-white">{user.followersIds?.length}</h1>
            <p className="text-white text-xs mt-1">Followers</p>
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center border-dashed border-r-2">
            <h1 className="text-6xl font-bold text-white">{posts?.length}</h1>
            <p className="text-white text-xs mt-1">Posts</p>
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-white">{user.followingIds?.length}</h1>
            <p className="text-white text-xs mt-1">Following</p>
          </div>
        </div>
      </div>

      <div className="h-1/2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-5">
          {posts?.map((p) => (
            <ProfilePostCard post={p} key={p.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
