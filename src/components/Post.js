import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useParams, Navigate } from "react-router-dom";
import parse from "html-react-parser";
import "./Post.css";

import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Post = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const fetchPost = async () => {
    const response = await fetch(
      `https://blog-api-application.azurewebsites.net/posts/${id}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      console.log("Post fetched successfully");
      const data = await response.json();
      setPost(data.post);
    }
  };

  const fetchComments = async () => {
    const response = await fetch(
      `https://blog-api-application.azurewebsites.net/posts/${id}/comments`,
      {
        method: "GET",
      }
    );
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

  const handleDeletePost = () => {
    try {
      fetchDeletePost();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDeletePost = async () => {
    const response = await fetch(
      `https://blog-api-application.azurewebsites.net/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the JWT token from localStorage
        },
      }
    );
    if (response.ok) {
      console.log("Post deleted successfully");
      setRedirectToHome(true);
    }
  };

  return (
    <div className="post">
      {redirectToHome && <Navigate replace to="/" />}
      {currentUser && <button onClick={handleDeletePost}>Delete Post</button>}
      <h1 className="post-title">{post.title}</h1>
      <p className="post-content">{post.content && parse(post.content)}</p>
      <div className="post-comments">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id} className="post-comment">
            <div>
              <Comment
                key={comment._id}
                commentId={comment._id}
                author={comment.email}
                text={comment.content}
                onCommentDelete={fetchComments}
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
