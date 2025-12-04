import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* flex-grow pushes the footer down, but doesn't force scroll if content is short */}
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}