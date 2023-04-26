import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./CommentForm.css";

const CommentForm = ({ onCommentSubmit }) => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:3000/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email, content }),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Comment created successfully");
        setEmail("");
        setContent("");
        onCommentSubmit();
      } else {
        console.log("Failed to create comment");
      }
    } catch (error) {
      console.error("Error while creating comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2>Add a comment</h2>
      <label htmlFor="email">Your email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="content">Comment:</label>
      <textarea
        id="content"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CommentForm;
