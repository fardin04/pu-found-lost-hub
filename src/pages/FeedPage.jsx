import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import PostCard from "@/components/ui/PostCard";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-center h-screen text-pu-blue">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg py-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-pu-blue mb-6 text-center">
        Lost & Found Feed
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts yet. Be the first to post!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} showActions={false} />
          ))}
        </div>
      )}
    </div>
  );
}
