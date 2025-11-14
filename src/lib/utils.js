// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Category Colors (used in PostCard)
export const categoryColors = {
  Found: {
    bg: "bg-found-accent",
    hover: "hover:bg-amber-400",
  },
  Lost: {
    bg: "bg-lost-accent",
    hover: "hover:bg-red-700",
  },
};

// Format Firestore Timestamp → readable date
export function formatTimestamp(timestamp) {
  if (!timestamp) return "";
  // Firestore Timestamp objects have .toDate()
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
