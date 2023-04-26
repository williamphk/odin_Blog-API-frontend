import React, { useState } from "react";
import "./CommentForm.css";

const CommentForm = () => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your comment submission logic here
    console.log("Author:", author);
    console.log("Text:", text);

    setAuthor("");
    setText("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2>Add a comment</h2>
      <label htmlFor="author">Your name:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label htmlFor="text">Comment:</label>
      <textarea
        id="text"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
