import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import PostCard from "@/components/ui/PostCard";

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    // Query posts by current user, order by newest first
    const q = query(
      collection(db, "itemPosts"),
      where("posterId", "==", currentUser.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(userPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-pu-blue">
        Loading your posts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg py-8 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-pu-blue mb-6 text-center">
        My Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't posted anything yet. Try creating a post!
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} showActions={true} />
          ))}
        </div>
      )}
    </div>
  );
}
