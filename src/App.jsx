import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/common/ProtectedRoute"; 
import { useAuth } from "@/context/AuthContext";

// --- Import your pages ---
import HomePage from "@/pages/HomePage"; // 🏠 Public homepage
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import FeedPage from "@/pages/FeedPage";
import ProfilePage from "@/pages/ProfilePage";
import PostItemPage from "@/pages/PostItemPage"; // 📝 New post page
import NotFoundPage from "@/pages/NotFoundPage"; // Optional fallback

export default function App() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-pu-blue">
        Checking authentication...
      </div>
    );
  }

  return (
    <Routes>
      {/* 🏠 Public Homepage */}
      <Route
        path="/"
        element={
          currentUser ? <Navigate to="/feed" replace /> : <HomePage />
        }
      />

      {/* 🔓 Public Auth Routes */}
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

      {/* 🔐 Protected Routes */}
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

      {/* 🚫 404 or Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
