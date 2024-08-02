"use client";

import React, { useState } from "react";

const CommentBox = () => {
  const [showMore, setShowMore] = useState(false);

  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis perferendis nam voluptatum sequi delectus velit fuga similique obcaecati reprehenderit debitis ratione doloremque, voluptatibus, cupiditate cum!        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit rerum dolores culpa dignissimos modi quo quaerat deserunt, omnis consectetur vel!";

  const finalText = showMore ? text : text.substring(0, 20);

  return (
    <div className="min-h-fit rounded-lg bg-dark-400 flex items-center p-4">
      <img
        className="w-16 h-16 rounded-lg object-cover"
        src="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <div className="h-full w-full px-4">
        <h1 className="text-lg white font-bold text-white">Imtiyaz</h1>
        <p className="text-xs white font-bold text-stone-400">
          {finalText}{" "}
          <span className="cursor-pointer text-white" onClick={() => setShowMore(!showMore)}>
            {!showMore ? "...show more" : "...show less"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CommentBox;
