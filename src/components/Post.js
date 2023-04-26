import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const fetchPost = async () => {
    const response = await fetch("http://localhost:3000/posts/" + id, {
      method: "GET",
    });
    if (response.ok) {
      console.log("Post fetched successfully");
      const data = await response.json();
      setPost(data.post);
    }
  };

  const fetchComments = async () => {
    const response = await fetch(`http://localhost:3000/posts/${id}/comments`, {
      method: "GET",
    });
    if (response.ok) {
      console.log("Comment fetched successfully");
      const data = await response.json();
      const { comments } = data;
      setComments(comments);
    }
  };

  useEffect(() => {
    try {
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="post">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-content">{post.content}</p>
      <div className="post-comments">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id} className="post-comment">
            <div>
              <Comment
                key={comment._id}
                author={comment.email}
                text={comment.content}
              />
            </div>
          </div>
        ))}
      </div>
      <CommentForm onCommentSubmit={fetchComments} />
    </div>
  );
};

export default Post;
