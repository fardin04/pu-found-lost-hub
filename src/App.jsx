import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Layout from "@/components/layout/Layout"; // Shared layout with Navbar + Footer
import { useAuth } from "@/context/AuthContext";

// Pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import FeedPage from "@/pages/FeedPage";
import ProfilePage from "@/pages/ProfilePage";
import PostItemPage from "@/pages/PostItemPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-accent">
        Checking authentication...
      </div>
    );
  }

  return (
    <Routes>

      {/* All pages will include Navbar + Footer */}
      <Route element={<Layout />}>

        {/* Public routes */}
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/feed" replace /> : <HomePage />
          }
        />
        <Route
          path="/login"
          element={
            currentUser ? <Navigate to="/feed" replace /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            currentUser ? <Navigate to="/feed" replace /> : <RegisterPage />
          }
        />

        {/* Private / Protected routes */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <PostItemPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />

      </Route>
    </Routes>
  );
}
