import OnBoardingForm from "@/components/forms/OnBoardingForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSingleClerkUser } from "@/lib/actions/user.actions";
import { SaveUser } from "@/lib/interfaces/userInterface";
import { parseStringify } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const OnBoardingPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ourUser = await getSingleClerkUser(user.id);
  if (ourUser?.isOnboarded) redirect("/");

  const userData = {
    id: ourUser?.id || "",
    clerkId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    bio: "",
    email: user.primaryEmailAddress?.emailAddress,
    profileImg: user.imageUrl,
    username: user.username,
  } as SaveUser;

  return (
    <div className="flex h-screen justify-center items-center px-5">
      <OnBoardingForm user={parseStringify(userData)} />
    </div>
  );
};

export default OnBoardingPage;
