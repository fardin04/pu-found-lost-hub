import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import PostCard from "@/components/ui/PostCard";
import Navbar from "@/components/layout/Navbar";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ... (useEffect and loading state logic remain the same)
  useEffect(() => {
    // Firestore query: get all posts ordered by timestamp descending
    const q = query(collection(db, "itemPosts"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen text-secondary">
          Loading posts...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-pu-blue mb-6 text-center">
          Found & Lost Feed
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet. Be the first to post!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto"> 
            {/* <-- UPDATED GRID: 1 column on mobile, 2 on small, 3 on large, 4 on extra-large */}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showActions={false} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}