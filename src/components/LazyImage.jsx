import React from "react";

export default function LazyImage({ src, alt = "", className = "" }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // fallback placeholder if image fails to load
        e.currentTarget.src = "/placeholder.png";
      }}
    />
  );
}
