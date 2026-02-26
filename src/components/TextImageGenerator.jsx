import React, { useState } from "react";
import axios from "axios";
import "@fontsource/poppins";

const TextImageGenerator = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(8);

  const generateImage = async () => {
    if (loading) return;

    setLoading(true);
    setImages([]);
    setCurrentIndex(8);

    try {
      let url = "";

      if (text.trim() === "") {
        // Random images
        url = `https://api.unsplash.com/photos/random?count=24&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`;
      } else {
        // Search images
        url = `https://api.unsplash.com/search/photos?query=${text}&per_page=24&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`;
      }

      const response = await axios.get(url);

      if (text.trim() === "") {
        setImages(response.data.map((img) => img.urls.regular));
      } else {
        setImages(response.data.results.map((img) => img.urls.regular));
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = () => {
    setCurrentIndex((prev) => prev + 8);
  };

  return (
    <div className="min-h-screen bg-gray-700 text-white flex flex-col items-center py-12 px-4">
      
      {/* Heading */}
      <h2
        className="text-4xl font-bold text-center mb-10"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Text to Image Generator
      </h2>

      {/* Input Section */}
      <div className="flex flex-col items-center w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        
        <textarea
          className="w-full p-4 rounded-lg text-black shadow-md mb-6"
          rows="3"
          placeholder="Enter text to generate your image..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition duration-300 disabled:opacity-50"
          onClick={generateImage}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : text.trim() === ""
            ? "Random Image Generate"
            : "Generate Image"}
        </button>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 w-full max-w-7xl">
        {images.slice(0, currentIndex).map((image, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-xl bg-white"
          >
            <img
              src={image}
              alt={`Generated ${index}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {currentIndex < images.length && (
        <button
          className="mt-10 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg shadow-lg transition duration-300"
          onClick={loadMoreImages}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default TextImageGenerator;