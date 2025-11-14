import React from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { categoryColors, formatTimestamp } from "@/lib/utils";
import LazyImage from "@/components/LazyImage";

export default function PostCard({ post, showActions = false }) {
  const { currentUser } = useAuth();

  // Badge color based on category using utils
  const badgeColor = categoryColors[post.category] || categoryColors.Found;

  // Handle Resolve action
  const handleResolve = async () => {
    try {
      const postRef = doc(db, "itemPosts", post.id);
      await updateDoc(postRef, { status: "RESOLVED" });
      toast.success("Post marked as resolved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to resolve post.");
    }
  };

  // Handle Delete action
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const postRef = doc(db, "itemPosts", post.id);
      await deleteDoc(postRef);
      toast.success("Post deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-neutral-200 mb-6">
      {/* Lazy Loaded Image */}
      <LazyImage
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        {/* Title & Badge */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-pu-blue">{post.title}</h3>
          <span
            className={`text-white text-xs font-medium px-2 py-1 rounded-full ${badgeColor.bg}`}
          >
            {post.category.toUpperCase()}
          </span>
        </div>

        {/* Location */}
        {post.location && (
          <p className="text-sm text-gray-600 mb-1">
            <strong>Location:</strong> {post.location}
          </p>
        )}

        {/* Description */}
        <p className="text-gray-700 mb-2">{post.description}</p>

        {/* Contact */}
        <p className="text-sm text-gray-600 mb-2">
          <strong>Contact:</strong> {post.contact}
        </p>

        {/* Timestamp */}
        {post.timestamp && (
          <p className="text-xs text-gray-500 mb-2">
            <strong>Posted:</strong> {formatTimestamp(post.timestamp)}
          </p>
        )}

        {/* Status */}
        <p
          className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
            post.status === "OPEN"
              ? "bg-green-100 text-green-800"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          {post.status}
        </p>

        {/* Actions (Profile Page only) */}
        {showActions && currentUser?.uid === post.posterId && (
          <div className="mt-4 flex gap-2">
            {post.status !== "RESOLVED" && (
              <button
                onClick={handleResolve}
                className="flex-1 py-2 rounded-lg bg-pu-blue text-white font-medium hover:bg-pu-blue-light transition"
              >
                Resolve
              </button>
            )}
            <button
              onClick={handleDelete}
              className={`flex-1 py-2 rounded-lg text-white font-medium transition ${badgeColor.bg} ${badgeColor.hover}`}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
