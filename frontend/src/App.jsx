import "./App.css";
import MainLayout from "./layouts/MainLayout.jsx";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";
import OtherUserProfilePage from "./pages/OtherUserProfilePage";

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/user/:username" element={<OtherUserProfilePage />} />
            <Route path="/post/:postSlug" element={<PostPage />} />
          </Route>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/account" element={<h1>Account</h1>} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
