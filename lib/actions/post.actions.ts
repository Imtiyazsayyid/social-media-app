"use server";

import { getAnyUser, UserParams, getUser } from "@/hooks/useUser";
import { SavePost } from "../interfaces/postInterface";
import prisma from "../prisma";
import { redirect } from "next/navigation";

export interface Filters {
  filters: {
    search: string;
  };
}

export async function savePost(post: SavePost) {
  const { id: userId } = await getUser();
  if (!userId) return;

  let obj = {
    title: post.title,
    caption: post.caption,
    url: post.url,
    userId,
  };

  try {
    if (post.id) {
      await prisma.post.update({
        data: obj,
        where: {
          id: post.id,
        },
      });
    } else {
      await prisma.post.create({
        data: obj,
      });
    }
  } catch (error) {
    console.log({ error });
  }
}

export async function getAnyUserPosts({ id, username }: UserParams) {
  const user = await getAnyUser({ username });

  if (!user) redirect("/");

  let userId = user.id;

  if (!userId) return;

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
    });

    return posts;
  } catch (error) {
    console.log({ error });
  }
}

export async function getSinglePost(id: string) {
  if (!id) return;

  try {
    const post = await prisma.post.findUnique({
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      where: {
        id,
      },
    });

    return post;
  } catch (error) {
    console.log({ error });
  }
}

export async function getAllPosts(params?: Filters) {
  try {
    let where: any = {};
    let filters = params?.filters;

    if (filters?.search) {
      where = {
        ...where,
        title: {
          contains: filters.search,
        },
      };
    }

    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      where,
    });
    return posts;
  } catch (error) {
    console.log({ error });
  }
}
