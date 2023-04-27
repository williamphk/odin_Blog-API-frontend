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
          <Route path="/odin_Blog-API-frontend/" element={<PostList />} />
          <Route path="/odin_Blog-API-frontend/login" element={<Login />} />
          <Route path="/odin_Blog-API-frontend/post/:id" element={<Post />} />
          <Route
            exact
            path="/odin_Blog-API-frontend/new-post"
            element={<ProtectedRoute />}
          >
            <Route
              path="/odin_Blog-API-frontend/new-post"
              element={<NewPost />}
            />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
