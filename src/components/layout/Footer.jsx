export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-accent text-white py-6 shadow-inner">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 gap-4">
        {/* Copyright Text */}
        <p className="text-sm text-center md:text-left font-medium opacity-90">
          PU Found & Lost Hub • © {currentYear} • All rights reserved.
        </p>

        {/* Feedback Link */}
        <a
          href="mailto:232321038@student.presidency.edu.bd"
          className="text-sm font-semibold underline decoration-transparent hover:decoration-white transition-all duration-300 opacity-90 hover:opacity-100"
        >
          Send feedback
        </a>
      </div>
    </footer>
  );
}
