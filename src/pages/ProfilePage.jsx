import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import PostCard from "@/components/ui/PostCard";
import Loader from "@/components/ui/Loader"; // 🔥 Import Loader
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Query posts by current user, order by newest first
    const q = query(
      collection(db, "itemPosts"),
      where("posterId", "==", currentUser.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(userPosts);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching posts:", err);
        setError(err.message);
        setLoading(false);

        if (err.code === "failed-precondition") {
          toast.error(
            "Database index required. Please create the composite index in Firebase Console."
          );
        } else {
          toast.error("Failed to load posts. Please try again.");
        }
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // --- Loading State ---
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-neutral-bg">
          <Loader size={50} color="#0D47A1" /> {/* 🔥 Use Loader */}
        </div>
      </>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <>
        <div className="min-h-screen bg-neutral-bg py-8 px-4 md:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[var(--lost)] mb-4">
              Error Loading Posts
            </h1>
            <p className="text-[var(--body-color)] mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--secondary)] text-white rounded-lg hover:bg-[var(--light)] transition"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  // --- Not Logged In ---
  if (!currentUser) {
    return (
      <>
        <div className="min-h-screen bg-neutral-bg py-8 px-4 md:px-8">
          <p className="text-center text-[var(--body-color)]">
            Please log in to view your posts.
          </p>
        </div>
      </>
    );
  }

  // --- Normal Render ---
  return (
    <>
      <div className="min-h-screen bg-neutral-bg py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-[var(--heading-color)] mb-6 text-center">
          My Posts
        </h1>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[var(--body-color)] text-lg mb-4">
              You haven't posted anything yet.
            </p>
            <p className="text-[var(--body-color)]">
              Try creating a post to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showActions={true} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
