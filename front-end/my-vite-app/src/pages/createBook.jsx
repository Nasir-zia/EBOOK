import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../component/backbutton.jsx";

export default function CreateBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    pages: "",
    publishYear: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("http://localhost:3000/book", book)
      .then((res) => {
        console.log("Book added successfully:", res.data);
        navigate("/"); // Redirect to home after successful creation
      })
      .catch((err) => {
        console.error("Error adding book:", err);
        setError("Failed to add book. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Add New Book</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Author:</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Pages */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Pages:</label>
          <input
            type="number"
            name="pages"
            value={book.pages}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Publish Year */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Publish Year:</label>
          <input
            type="number"
            name="publishYear"
            value={book.publishYear}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Price ($):</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={book.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
