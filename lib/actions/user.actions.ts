"use server";

import { User } from "@prisma/client";
import { SaveUser } from "../interfaces/userInterface";
import prisma from "../prisma";
import { useUser } from "@/hooks/useUser";

export async function getSingleUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.log({ error });
  }
}

export async function getSingleClerkUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
    });

    return user;
  } catch (error) {
    console.log({ error });
  }
}

export async function saveUser(user: SaveUser) {
  console.log({ user });

  let obj = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    profileImg: user.profileImg,
    username: user.username,
    clerkId: user.clerkId,
    bio: user.bio,
    isOnboarded: true,
  } as SaveUser;

  try {
    if (user.id) {
      await prisma.user.update({
        data: obj,
        where: {
          id: user.id,
        },
      });
    } else {
      await prisma.user.create({
        data: obj,
      });
    }
  } catch (error) {
    console.log({ error });
  }
}

export async function likePost(postId: string, isLiked: boolean) {
  const { id: userId } = await useUser();

  if (isLiked) {
    await prisma.post.update({
      data: {
        likeUserIds: {
          push: userId,
        },
      },
      where: {
        id: postId,
      },
    });
  } else {
    const likes = await prisma.post.findUnique({
      select: {
        likeUserIds: true,
      },
      where: {
        id: postId,
      },
    });

    await prisma.post.update({
      data: {
        likeUserIds: likes?.likeUserIds.filter((l) => l !== userId),
      },
      where: {
        id: postId,
      },
    });
  }
}

export async function postComment(postId: string, comment: string) {
  const { id: userId } = await useUser();

  if (!comment || !userId) {
    return;
  }

  const newComment = await prisma.comment.create({
    data: {
      text: comment,
      postId,
      userId,
    },
  });
}
