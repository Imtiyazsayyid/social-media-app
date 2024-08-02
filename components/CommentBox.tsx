"use client";

import { Comment, User } from "@prisma/client";
import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

interface Props {
  comment: Comment & { user: User };
  user: User;
}

const CommentBox = ({ comment, user }: Props) => {
  const [showMore, setShowMore] = useState(false);

  const text = comment.text;
  const finalText = showMore ? text : text.substring(0, 80);

  return (
    <div className="min-h-fit rounded-lg bg-dark-400 flex items-center p-4">
      <img
        className="w-16 h-16 rounded-lg object-cover"
        src={user.profileImg}
      />
      <div className="h-full w-full px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg white font-bold text-white">
            {user.firstName} {user.lastName}
          </h1>
          <ReactTimeAgo
            className="text-[10px] text-stone-200"
            date={comment.createdAt}
            locale="en-US"
          />
        </div>

        <p className="text-xs white font-bold text-stone-400">
          {finalText}{" "}
          {text.length >= 80 && (
            <span
              className="cursor-pointer text-white"
              onClick={() => setShowMore(!showMore)}
            >
              {!showMore ? "...show more" : "...show less"}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CommentBox;
