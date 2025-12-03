import React from "react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="mt-12 bg-[var(--accent)] text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          PU Found & Lost Hub • © {currentYear} • All rights reserved.
        </p>
        <a
          href="mailto:232321038@student.presidency.edu.bd"
          className="mt-2 md:mt-0 text-sm underline hover:no-underline text-white/90"
        >
          Send feedback
        </a>
      </div>
    </footer>
  );
};

export default Footer;
