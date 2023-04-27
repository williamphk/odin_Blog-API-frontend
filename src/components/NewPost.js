import React, { useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import env from "react-dotenv";

import "./NewPost.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [redirectToPost, setRedirectToPost] = useState(false);
  const [postId, setPostId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        "https://blog-api-application.azurewebsites.net/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the JWT token from localStorage
          },
          body: JSON.stringify({ title, content, isPublic }),
        }
      );

      if (response.ok) {
        console.log("Post created successfully");
        const data = await response.json();
        setPostId(data.post._id);
        setTitle("");
        setContent("");
        setIsPublic(false);
        setRedirectToPost(true);
      } else {
        console.log("Failed to create post");
      }
    } catch (error) {
      console.error("Error while creating post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div className="new-post">
      {redirectToPost && <Navigate replace to={`/post/${postId}`} />}
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
          <Editor
            apiKey={env.API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(content, editor) => {
              // Handle content change
              setContent(content);
            }}
          />
        </div>
        <div>
          <label htmlFor="isPublic"> Public:</label>
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
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
