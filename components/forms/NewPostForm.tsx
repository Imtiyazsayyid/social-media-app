"use client";

import { SavePost } from "@/lib/interfaces/postInterface";
import React, { useState } from "react";
import UploadCloudinary from "../UploadCloudinary";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import * as PostActions from "@/lib/actions/post.actions";
import StandardSuccessToast from "../StandardSuccessToast";
import StandardErrorToast from "../StandardErrorToast";
import { useRouter } from "next/navigation";

interface Props {
  username: string;
}

const NewPostForm = ({ username }: Props) => {
  const defaultValues = {
    caption: "",
    title: "",
    url: "",
  };

  console.log({ username });

  const [post, setPost] = useState<SavePost>(defaultValues);
  const router = useRouter();

  const savePost = async () => {
    try {
      if (!post.url) {
        StandardErrorToast("Please Add An Image", "You Must Add An Image to Create A Post");
        return;
      }

      await PostActions.savePost(post);

      StandardSuccessToast("Post Saved", "Your Post Has Been Created Successfully");
      router.push(`/profile/${username}`);

      setPost(defaultValues);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form
      className="h-fit w-fit flex flex-col lg:flex-row gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        savePost();
      }}
    >
      <div className="flex gap-2 lg:hidden">
        <div className="w-fit h-fit p-1 bg-white rounded-xl">
          <img src="/logo.png" className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold text-white text-start">Create A New Post</h1>
      </div>

      <div className="flex justify-center w-full h-full lg:w-[40vw] lg:min-h-[50vh] max-h-[40vh] lg:max-h-[50vh]">
        <UploadCloudinary
          divStyle="w-full h-full rounded-xl overflow-hidden"
          setLink={(link) => setPost({ ...post, url: link })}
          link={post.url}
        />
      </div>
      <div className="flex flex-col justify-center gap-3 w-full lg:w-[40vw]">
        <div className="w-fit h-fit p-1 bg-white rounded-xl hidden lg:block">
          <img src="/logo.png" className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-white text-start hidden lg:block">Create A New Post</h1>
        <Input
          className="shad-input w-full"
          required
          placeholder="Title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        <Textarea
          className="shad-textArea resize-none h-40 lg:h-96 w-full"
          placeholder="Caption"
          required
          value={post.caption}
          onChange={(e) => setPost({ ...post, caption: e.target.value })}
        />
        <Button className="shad-primary-btn" type="submit">
          Create Post
        </Button>
      </div>
    </form>
  );
};

export default NewPostForm;
