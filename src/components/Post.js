import React from "react";
import { useParams } from "react-router-dom";
import "./Post.css";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Post = () => {
  const { id } = useParams();
  const post = {
    id: 1,
    title: "Post 1",
    content: "This is the content of the first post.",
  };

  const comments = [
    { id: 1, author: "User 1", text: "This is a comment." },
    { id: 2, author: "User 2", text: "This is another comment." },
  ];

  return (
    <div className="post">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-content">{post.content}</p>
      <div className="post-comments">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="post-comment">
            <p>
              <Comment
                key={comment.id}
                author={comment.author}
                text={comment.text}
              />
            </p>
          </div>
        ))}
      </div>
      <CommentForm />
    </div>
  );
};

export default Post;
