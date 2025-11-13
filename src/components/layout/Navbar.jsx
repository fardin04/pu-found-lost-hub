import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";


export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
          toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-4 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-pu-blue cursor-pointer"
        onClick={() => navigate("/")}
      >
        PU<span className="text-found-accent">Found</span>
      </div>

      {/* Navigation / Action Buttons */}
      <nav className="flex gap-3 md:gap-6 items-center">
        {!currentUser ? (
          <>
            <Button
              variant="outline"
              className="text-pu-blue border-pu-blue hover:bg-pu-blue hover:text-white transition"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-pu-blue hover:bg-pu-blue-light text-white transition"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="text-pu-blue hover:text-pu-blue-light transition"
              onClick={() => navigate("/feed")}
            >
              Feed
            </Button>
            <Button
              variant="ghost"
              className="text-pu-blue hover:text-pu-blue-light transition"
              onClick={() => navigate("/post")}
            >
              Post Item
            </Button>
            <Button
              variant="ghost"
              className="text-pu-blue hover:text-pu-blue-light transition"
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              className="bg-lost-accent hover:bg-red-700 text-white transition"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
