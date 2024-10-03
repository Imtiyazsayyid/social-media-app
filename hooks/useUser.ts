"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export interface UserParams {
  id?: string;
  username?: string;
}

export const getAnyUser = async ({ id, username }: UserParams) => {
  let user;

  if (id || username) {
    let where: any = {};

    if (id) {
      where = {
        id,
      };
    }

    if (username) {
      where = {
        username,
      };
    }

    user = await prisma.user.findUnique({
      where,
    });
  }

  if (!user) return null;

  return { ...user };
};

export const getUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  return { ...user };
};
