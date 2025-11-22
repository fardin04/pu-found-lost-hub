import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";
import { Helmet } from "react-helmet";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
    <Helmet>
            <title>PU Found & Lost Feed - Presidency University</title>
            <meta name="description" content="See all found and lost items reported by Presidency University students." />
          </Helmet>
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
          <h1 className="text-3xl font-bold text-accent mb-4">
            Found or Lost Something?
          </h1>
          <p className="text-gray-700 mb-6">
            Welcome to <span className="font-semibold text-pu-blue">PU Found & Lost Hub</span> — 
            a community platform for students of Presidency University to 
            report and recover lost items on campus. If you find something or 
            lose your belongings, post here to help connect with others.
          </p>
          <Button
            className="bg-found-accent hover:bg-accent border text-black px-6 py-3 text-lg rounded-xl"
            onClick={() => navigate("/register")}
          >
            Register Now
          </Button>
        </div>
      </main>

      {/* 🔹 Footer (optional) */}
      <footer className="bg-black text-center text-white py-4 text-sm">
        © {new Date().getFullYear()} PU Found & Lost Hub. All rights reserved.
      </footer>
    </div>
    </>
  );
}
