import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../component/spinner'; 
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';


export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/books')
      .then((response) => {
        console.log("API Response:", response.data); 
        setBooks(response.data.books || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Axios Error:", error); 
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="p-4">
      {/* Top Section */}
      <div className="flex justify-between text-center mb-4">
        <h1 className=" font-semibold text-3xl text-red-600 ">Books List</h1>
        <Link to="/book/CreateBook">
          <MdOutlineAddBox className="text-sky-800 text-4xl cursor-pointer" />
        </Link>
      </div>

      {/* Conditional Rendering for Spinner */}
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2 text-center">
          <thead>
            <tr>
              <th className="border border-gray-400 rounded-md p-2 bg-slate-500">No</th>
              <th className="border border-gray-400 rounded-md p-2 bg-orange-100">Title</th>
              <th className="border border-gray-400 rounded-md p-2 hidden md:table-cell bg-red-400">Author</th>
              <th className="border border-gray-400 rounded-md p-2 hidden md:table-cell bg-green-300">Publish Year</th>
              <th className="border border-gray-400 rounded-md p-2 hidden md:table-cell bg-blue-100">Pages</th>

              <th className="border border-gray-400 rounded-md p-2 bg-yellow-100">Operations</th>
              
            </tr>
          </thead>
          <tbody>
            {books.map((books, index) => (
              <tr key={books.id}>
                <td className="border border-gray-400 rounded-md p-2 bg-slate-500 shadow">{index + 1}</td>
                <td className="border border-gray-400 rounded-md p-2 bg-orange-200">{books.title}</td>
                <td className="border border-gray-400 rounded-md p-2 hidden md:table-cell bg-amber-200">{books.author}</td>
                <td className="border border-gray-400 rounded-md p-2 hidden md:table-cell bg-green-300">{books.publishYear}</td>
                <td className="border border-gray-400 rounded-md p-2 hidden md:table-cell bg-lime-200">{books.pages}</td>

                <td className="border border-gray-400 rounded-md p-2 flex gap-8 justify-center bg-teal-200">
                  <Link to="/book/BookDetail">
                    <BsPlusCircle className="text-sky-800 text-2xl cursor-pointer " />
                  </Link>
                  <Link to= "/book/Edit">
                    <AiOutlineEdit className="text-sky-800 text-2xl cursor-pointer" />
                  </Link>
                  <Link to= "">
                    <MdOutlineDelete className="text-red-600 text-2xl cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
