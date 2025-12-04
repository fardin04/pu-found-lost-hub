import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully!");
      navigate("/");
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar Header */}
      <header className="flex justify-between items-center px-4 md:px-12 py-3 bg-accent shadow-sm sticky top-0 z-50 w-full">
        
        {/* Logo Section */}
        <div
          className="flex items-center cursor-pointer gap-2 overflow-hidden" 
          onClick={() => handleNavigation("/")}
        >
          <img
            src="/pu-logo.png"
            alt="PU Logo"
            /* 1. INCREASED SIZE: h-14 w-14 on mobile (was 12) */
            className="h-14 w-14 md:h-16 md:w-16 object-contain shrink-0"
          />
          {/* 2. RESPONSIVE TEXT: text-sm on mobile prevents overlapping */ }
          <span className="text-white font-bold text-sm sm:text-lg md:text-xl truncate">
            PU Found & Lost Hub
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-4 items-center">
          {!currentUser ? (
            <>
              <Button
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white/20 transition-all"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-white text-accent hover:bg-white/90 border-2 border-white transition-all font-semibold"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-white hover:bg-white/20 transition" onClick={() => navigate("/feed")}>
                Feed
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20 transition" onClick={() => navigate("/post")}>
                Post Item
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20 transition" onClick={() => navigate("/profile")}>
                Profile
              </Button>
              <Button className="bg-lost-accent hover:bg-red-700 text-white transition" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </nav>

        {/* 3. HAMBURGER ICON FIXES */}
        {/* Added 'shrink-0' so it never gets squashed by the logo */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none shrink-0 ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </header>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-accent shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white text-3xl focus:outline-none"
          >
            <HiX />
          </button>
        </div>

        {/* Mobile Nav Items */}
        <nav className="flex flex-col gap-4 px-6 py-4">
          {!currentUser ? (
            <>
              <Button
                className="w-full text-white border-2 border-white bg-transparent hover:bg-white/20"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>
              <Button
                className="w-full bg-white text-accent border-2 border-white hover:bg-white/90"
                onClick={() => handleNavigation("/register")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="w-full text-white hover:bg-white/20" onClick={() => handleNavigation("/feed")}>
                Feed
              </Button>
              <Button variant="ghost" className="w-full text-white hover:bg-white/20" onClick={() => handleNavigation("/post")}>
                Post Item
              </Button>
              <Button variant="ghost" className="w-full text-white hover:bg-white/20" onClick={() => handleNavigation("/profile")}>
                Profile
              </Button>
              <Button className="w-full bg-lost-accent hover:bg-red-700 text-white mt-4" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}