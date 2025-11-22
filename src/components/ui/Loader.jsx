import React from "react";

export default function Loader({ size = 40, thickness = 4, className = "", ariaLabel = "Loading" }) {
  const style = {
    width: size,
    height: size,
    borderWidth: thickness,
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label={ariaLabel}>
      <div
        className="rounded-full animate-spin border-t-transparent"
        style={style}
      />
    </div>
  );
}
