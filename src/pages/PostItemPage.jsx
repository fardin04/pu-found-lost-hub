import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { categoryColors } from "@/lib/utils";

export default function PostItemPage() {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    category: "Found",
    location: "",
    description: "",
    contact: "",
    imageFile: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.contact || !formData.location) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // Upload image if exists
      let imageUrl = "";
      if (formData.imageFile) {
        const imageRef = ref(storage, `itemImages/${Date.now()}_${formData.imageFile.name}`);
        await uploadBytes(imageRef, formData.imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Save to Firestore
      await addDoc(collection(db, "itemPosts"), {
        title: formData.title,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        contact: formData.contact,
        imageUrl,
        posterId: currentUser.uid,
        status: "OPEN",
        timestamp: serverTimestamp(),
      });

      toast.success("Post created successfully!");

      // Reset form
      setFormData({
        title: "",
        category: "Found",
        location: "",
        description: "",
        contact: "",
        imageFile: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic form colors based on category
  const accentBg = formData.category === "Found" ? "bg-amber-50 border-amber-400" : "bg-red-50 border-red-400";
  const accentBtn = formData.category === "Found" ? "bg-found-accent hover:bg-amber-600" : "bg-lost-accent hover:bg-red-700";

  return (
    <div className="min-h-screen bg-neutral-bg flex items-center justify-center p-4">
      <div className={`w-full max-w-lg rounded-2xl shadow-md p-8 border ${accentBg}`}>
        <h2 className="text-2xl font-semibold text-center text-pu-blue mb-6">
          Create a Lost / Found Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pu-blue focus:outline-none"
              placeholder="e.g. Found Blue Bag near Library"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pu-blue focus:outline-none ${categoryColors[formData.category]?.bg}`}
            >
              <option value="Found">Found</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pu-blue focus:outline-none"
              placeholder="Where was it lost/found?"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pu-blue focus:outline-none"
              placeholder="Briefly describe the item..."
            ></textarea>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pu-blue focus:outline-none"
              placeholder="Phone number or email"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Photo (optional)</label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-700 border rounded-lg p-2 focus:ring-2 focus:ring-pu-blue focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-medium transition ${accentBtn}`}
          >
            {loading ? "Posting..." : `Post ${formData.category} Item`}
          </button>
        </form>
      </div>
    </div>
  );
}
