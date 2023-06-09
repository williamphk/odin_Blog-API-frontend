import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import parse from "html-react-parser";
import "./PostList.css";

const PostList = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // If user is logged in
      if (currentUser) {
        const response = await fetch(
          "https://blog-api-application.azurewebsites.net/posts/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the JWT token from localStorage
            },
          }
        );
        if (response.ok) {
          console.log("Post fetched successfully");
          const data = await response.json();
          const { posts } = data;
          setPosts(posts);
        }
      } else {
        const response = await fetch(
          "https://blog-api-application.azurewebsites.net/posts/public",
          {
            method: "GET",
          }
        );
        if (response.ok) {
          console.log("Post fetched successfully");
          const data = await response.json();
          const { posts } = data;
          setPosts(posts);
        }
      }
    };

    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [currentUser]);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post._id} className="post-list-item">
          <h2 className="post-title">
            <Link
              to={`/odin_Blog-API-frontend/post/${post._id}`}
              className="post-link"
            >
              {post.title}
            </Link>
          </h2>
          <p>{parse(post.content)}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
