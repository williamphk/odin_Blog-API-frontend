import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PostList from "./components/PostList";
import Post from "./components/Post";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<Post />} />
          <Route exact path="/new-post" element={<ProtectedRoute />}>
            <Route path="/new-post" element={<NewPost />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
