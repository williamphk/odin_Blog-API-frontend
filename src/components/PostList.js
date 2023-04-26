import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/posts/public", {
        method: "GET",
      });
      if (response.ok) {
        console.log("Post fetched successfully");
        const data = await response.json();
        const { posts } = data;
        setPosts(posts);
      }
    };

    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post._id} className="post-list-item">
          <h2 className="post-title">
            <Link to={`/post/${post.id}`} className="post-link">
              {post.title}
            </Link>
          </h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
