import React from "react";
import { Link } from "react-router-dom";
import "./PostList.css";

const PostList = () => {
  const posts = [
    { id: 1, title: "Post 1", excerpt: "This is the first post." },
    { id: 2, title: "Post 2", excerpt: "This is the second post." },
    { id: 3, title: "Post 3", excerpt: "This is the third post." },
  ];

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-list-item">
          <h2 className="post-title">
            <Link to={`/post/${post.id}`} className="post-link">
              {post.title}
            </Link>
          </h2>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
