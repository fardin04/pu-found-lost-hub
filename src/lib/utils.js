
// 1️⃣ Category Colors (for badges/buttons)
export const categoryColors = {
  Lost: {
    bg: "bg-lost-accent",
    hover: "hover:bg-red-700",
  },
  Found: {
    bg: "bg-found-accent",
    hover: "hover:bg-amber-600",
  },
};

// 2️⃣ Format Firestore Timestamp
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 3️⃣ Lazy Image Component with Placeholder
export const LazyImage = ({ src, alt, className }) => (
  <img
    src={src || "https://via.placeholder.com/400x300?text=No+Image"}
    alt={alt}
    className={className}
    loading="lazy"
    onError={(e) =>
      (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")
    }
  />
);
