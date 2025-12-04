import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { categoryColors } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// --- CLOUDINARY CONFIGURATION ---
const { VITE_CLOUDINARY_NAME, VITE_CLOUDINARY_UPLOAD_PRESET } = import.meta.env;
// ---------------------------------

// --- HELPER FUNCTION: Cloudinary Upload ---
// This function handles the direct upload of the file to Cloudinary
async function uploadToCloudinary(file) {
  if (!file) return "";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", VITE_CLOUDINARY_UPLOAD_PRESET);

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_NAME}/image/upload`;

  const response = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    // Attempt to get detailed error message from Cloudinary response
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error during upload." }));
    console.error("Cloudinary upload error details:", errorData);
    throw new Error(
      `Cloudinary upload failed: ${
        errorData.error?.message || response.statusText
      }`
    );
  }

  const data = await response.json();
  return data.secure_url;
}
// ------------------------------------------

export default function PostItemPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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

    // Check if user is authenticated
    if (!currentUser) {
      toast.error("You must be logged in to create a post.");
      navigate("/login");
      return;
    }

    if (
      !formData.title ||
      !formData.description ||
      !formData.contact ||
      !formData.location
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // 1. UPLOAD IMAGE TO CLOUDINARY
      let imageUrl = "";
      if (formData.imageFile) {
        console.log("Uploading image to Cloudinary...");
        // Use the new helper function
        imageUrl = await uploadToCloudinary(formData.imageFile);
        console.log("Image uploaded successfully:", imageUrl);
      }

      // 2. SAVE CLOUDINARY URL TO FIRESTORE
      console.log("Saving to Firestore...");
      const docRef = await addDoc(collection(db, "itemPosts"), {
        title: formData.title,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        contact: formData.contact,
        imageUrl: imageUrl || "", // <--- Stores the Cloudinary URL
        posterId: currentUser.uid,
        status: "OPEN",
        timestamp: serverTimestamp(),
      });

      console.log("Document written with ID:", docRef.id);
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

      // Navigate to feed or profile after successful post
      setTimeout(() => {
        navigate("/feed");
      }, 1500);
    } catch (err) {
      console.error("Error creating post:", err);
      // Display a general error message for both upload and Firestore failures
      toast.error(`Failed to create post: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic form colors based on category
  const accentBg =
    formData.category === "Found"
      ? "bg-amber-50 border-amber-400"
      : "bg-red-50 border-red-400";
  const accentBtn =
    formData.category === "Found"
      ? "bg-[#FBBF24] hover:bg-[#F59E0B]"
      : "bg-[#DC2626] hover:bg-[#B91C1C]";

  // Show message if user is not logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-bg flex flex-col">
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--heading-color)] mb-4">
              Please Log In
            </h2>
            <p className="text-[var(--body-color)] mb-4">
              You need to be logged in to create a post.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-[var(--secondary)] text-white rounded-lg hover:bg-[var(--light)] transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col">
      <div
        className={`w-full max-w-lg rounded-2xl shadow-md p-8 border ${accentBg} flex flex-col items-center justify-center mx-auto mt-10 mb-20`}
      >
        <h2 className="text-2xl font-semibold text-center text-secondary mb-6">
          Create a Found / Lost Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pu-blue focus:outline-none ${
                categoryColors[formData.category]?.bg
              }`}
            >
              <option value="Found">Found</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              placeholder="e.g. Found Blue Bag near Library"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              placeholder="Where was it lost/found?"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              placeholder="Briefly describe the item..."
            ></textarea>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
              placeholder="Phone number"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Photo (optional)
            </label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-700 border rounded-lg p-2 focus:ring-2 focus:ring-secondary focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white cursor-pointer font-medium transition ${accentBtn} ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Posting..." : `Post ${formData.category} Item`}
          </button>
        </form>
      </div>
    </div>
  );
}
