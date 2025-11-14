import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
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
    <header className="grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-12 py-3 bg-accent shadow-sm sticky top-0 z-50">
      
      {/* Left: Logo */}
      <div
        className="flex items-center cursor-pointer justify-self-start"
        onClick={() => navigate("/")}
      >
        <img
          src="/pu-logo.png"
          alt="PU Logo"
          className="h-10 w-10 object-contain mr-3" 
        />
      </div>

      {/* Center: Title */}
      <div className="flex items-center justify-center">
        <span className="text-white font-bold text-lg md:text-xl whitespace-nowrap">
          PU Found & Lost Hub
        </span>
      </div>

      {/* Right: Navigation / Action Buttons */}
      <nav className="flex gap-3 md:gap-4 items-center justify-self-end">
        {!currentUser ? (
          <>
            {/* Guest users - Login and Sign Up buttons */}
            <Button
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white/20 hover:border-white transition-all cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-white text-accent hover:bg-white/90 border-2 border-white transition-all font-semibold cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            {/* Logged-in users */}
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 transition cursor-pointer"
              onClick={() => navigate("/feed")}
            >
              Feed
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 transition cursor-pointer"
              onClick={() => navigate("/post")}
            >
              Post Item
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 transition cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              className="bg-lost-accent hover:bg-red-700 text-white transition cursor-pointer"
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
