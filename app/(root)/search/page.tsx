"use client";

import ProfilePostCard from "@/components/ProfilePostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import UserCards from "@/components/UserCards";
import { getAllPosts } from "@/lib/actions/post.actions";
import { getAllUsers } from "@/lib/actions/user.actions";
import { Post, User } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<any[]>();
  const [users, setUsers] = useState<User[]>();

  const fetchAllData = async () => {
    const posts = await getAllPosts({ filters: { search } });
    const users = await getAllUsers({ filters: { search } });
    setPosts(posts);
    setUsers(users);
  };

  useEffect(() => {
    fetchAllData();
  }, [search]);

  return (
    <div className="flex justify-center pb-40">
      <div className="w-full flex-col max-w-[1000px] max-h-full">
        <div className="flex gap-2 w-full mb-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="shad-input w-full"
            placeholder="Find Your Friends or Posts..."
          />
        </div>
        <div>
          {users && users.length > 0 && (
            <>
              <h1 className="text-2xl text-white font-bold mt-10 mb-5">
                Users
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-10">
                {users?.map((u) => (
                  <UserCards key={u.id} user={u} />
                ))}
              </div>
            </>
          )}

          {posts && posts?.length > 0 && users && users.length > 0 && (
            <Separator />
          )}

          {posts && posts?.length > 0 && (
            <>
              <h1 className="text-2xl text-white font-bold mt-10 mb-5">
                Posts
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {posts?.map((p) => (
                  <ProfilePostCard
                    post={p as Post}
                    key={p.id}
                    user={p.user as User}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
