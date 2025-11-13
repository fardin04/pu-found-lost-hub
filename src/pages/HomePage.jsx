import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col">
      {/* 🔹 Navbar Section */}
      <Navbar />

      {/* 🖼️ Hero Section */}
      <main
        className="flex flex-col items-center justify-center text-center flex-grow px-6 py-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-md max-w-2xl">
          <h1 className="text-3xl font-bold text-pu-blue mb-4">
            Lost or Found Something?
          </h1>
          <p className="text-gray-700 mb-6">
            Welcome to <span className="font-semibold text-pu-blue">PU Found</span> — 
            a community platform for students of Presidency University to 
            report and recover lost items on campus. If you find something or 
            lose your belongings, post here to help connect with others.
          </p>
          <Button
            className="bg-found-accent hover:bg-amber-500 text-white px-6 py-3 text-lg rounded-xl"
            onClick={() => navigate("/register")}
          >
            Register Now
          </Button>
        </div>
      </main>

      {/* 🔹 Footer (optional) */}
      <footer className="text-center text-gray-500 py-4 text-sm">
        © {new Date().getFullYear()} PU Found. All rights reserved.
      </footer>
    </div>
  );
}
