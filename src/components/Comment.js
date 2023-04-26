import React from "react";
import "./Comment.css";

const Comment = ({ author, text }) => {
  return (
    <div className="comment">
      <p>
        <strong className="comment-author">{author}:</strong> {text}
      </p>
    </div>
  );
};

export default Comment;
