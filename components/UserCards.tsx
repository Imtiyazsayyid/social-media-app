"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  user: User;
}

const UserCards = ({ user }: Props) => {
  const router = useRouter();

  return (
    <div
      className="h-20 rounded-lg bg-dark-400 flex items-center p-2 gap-2 cursor-pointer"
      onClick={() => router.push("/profile/" + user.username)}
    >
      <img src={user.profileImg} className="max-h-16 max-w-16 rounded-full" />
      <div className="flex flex-col">
        <h1 className="text-xl text-white font-bold">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-sm text-white">@{user.username}</p>
      </div>
    </div>
  );
};

export default UserCards;
