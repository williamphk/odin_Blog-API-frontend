import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import "./NewPost.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/newpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the JWT token from localStorage
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        console.log("Post created successfully");
        setTitle("");
        setContent("");
      } else {
        console.log("Failed to create post");
      }
    } catch (error) {
      console.error("Error while creating post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-post">
      <h2>Create a new post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default NewPost;
