"use client";

import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SaveUser } from "@/lib/interfaces/userInterface";
import * as UserActions from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

interface Props {
  user: SaveUser;
}

const OnBoardingForm = ({ user }: Props) => {
  const [form, setForm] = useState<SaveUser>({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    bio: "",
    profileImg: user.profileImg || "",
    username: user.username || "",
    clerkId: user.clerkId || "",
    id: user.id || "",
  });

  const router = useRouter();

  const saveUser = async () => {
    try {
      await UserActions.saveUser(form);
      router.replace("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form
      className="min-h-1/2 w-full sm:w-2/3 md:w-1/2 xl:w-1/3 bg-dark-400 rounded-lg shadow-lg p-10"
      onSubmit={(e) => {
        e.preventDefault();
        saveUser();
      }}
    >
      <div>{/* <img className=""/> */}</div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <Label className="shad-input-label">First Name</Label>
          <Input
            required
            className="shad-input"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="shad-input-label">Last Name</Label>
          <Input
            required
            className="shad-input"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="shad-input-label">Username</Label>
          <Input
            className="shad-input"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="shad-input-label">Email</Label>
          <Input
            required
            className="shad-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="shad-input-label">Bio</Label>
          <Textarea
            className="shad-textArea resize-none"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>

        <Button className="shad-primary-btn" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default OnBoardingForm;
