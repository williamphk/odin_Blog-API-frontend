import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import "./Comment.css";

const Comment = ({ commentId, author, text, onCommentDelete }) => {
  const { currentUser } = useAuth();
  const { id } = useParams();

  const handleDeleteComment = () => {
    try {
      fetchDeleteComment();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDeleteComment = async () => {
    const response = await fetch(
      `https://blog-api-application.azurewebsites.net/posts/${id}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the JWT token from localStorage
        },
      }
    );
    if (response.ok) {
      console.log("Post deleted successfully");
      onCommentDelete();
    }
  };

  return (
    <div className="comment">
      <p>
        <strong className="comment-author">{author}:</strong> {parse(text)}{" "}
        {currentUser && <button onClick={handleDeleteComment}>Delete</button>}
      </p>
    </div>
  );
};

export default Comment;
