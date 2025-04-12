import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../component/backbutton.jsx";
import Spinner from "../component/spinner.jsx";

export default function EditBook() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    pages: "",
    publishYear: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch book details on load
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/books/",{id});
        
        // Ensure we have valid data
        if (res.data && Object.keys(res.data).length > 0) {
          setBook(res.data);
        } else {
          setError("Book not found!");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]); // ✅ Dependency ensures it runs when `_id` changes

  // Handle input changes
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle form submission (Update book)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.put("http://localhost:3000/books/",{id}, book);
      console.log("Book updated successfully:", res.data);
      navigate("/"); // Redirect to home after update
    } catch (err) {
      console.error("Error updating book:", err);
      setError("Failed to update book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-600 p-6">
      <BackButton />
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-white text-center mb-6">Edit Book ✏️</h1>

        {loading ? <Spinner /> : null}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-white font-semibold mb-1">Title:</label>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter book title"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-white font-semibold mb-1">Author:</label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter author name"
              />
            </div>

            {/* Pages */}
            <div>
              <label className="block text-white font-semibold mb-1">Pages:</label>
              <input
                type="number"
                name="pages"
                value={book.pages}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Total pages"
              />
            </div>

            {/* Publish Year */}
            <div>
              <label className="block text-white font-semibold mb-1">Publish Year:</label>
              <input
                type="number"
                name="publishYear"
                value={book.publishYear}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Publishing year"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-white font-semibold mb-1">Price ($):</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={book.price}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter price"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition transform active:scale-95 flex justify-center items-center"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Update Book"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
