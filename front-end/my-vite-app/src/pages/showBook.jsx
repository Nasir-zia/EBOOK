import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../component/backbutton.jsx';
import Spinner from '../component/spinner.jsx';

export default function ShowBook() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books/",{id}) 
      .then((res) => {
        console.log("Book fetched successfully:", res.data);
        setBook(res.data); // Response is already the book object
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Show Book</h1>

      {loading ? (
        <Spinner />
      ) : book ? (
        <div className="flex flex-col border-2 border-sky-800 rounded-xl w-fit p-4 mx-auto">
          <div className="my-4">
            <span className="text-xl text-gray-500 font-semibold">Id: </span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 font-semibold">Title: </span>
            <span>{book.title}</span>
            {console.log("Book title:", book.title)
            }
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 font-semibold">Author: </span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 font-semibold">Pages: </span>
            <span>{book.pages}</span>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center">Book not found.</p>
      )}
    </div>
  );
}
