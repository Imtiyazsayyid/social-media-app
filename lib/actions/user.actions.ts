"use server";

import { User } from "@prisma/client";
import { SaveUser } from "../interfaces/userInterface";
import prisma from "../prisma";

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
