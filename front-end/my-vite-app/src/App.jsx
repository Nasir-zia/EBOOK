import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from "./pages/Home"
import Edit from "./pages/Edit"
import Deletebook from "./pages/DeleteBook"
import ShowBook from './pages/showBook'
import CreateBook from './pages/createBook' 


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/Edit" element={<Edit />} />
      <Route path="/book/BookDetail" element={<ShowBook />} />
      <Route path="/book/DeleteBook" element={<Deletebook />} />
      <Route path="/book/CreateBook" element={<CreateBook />} />

    </Routes>
  )
}
