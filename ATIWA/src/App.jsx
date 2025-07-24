import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/Pages/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import Login from './Admin/Login';
import Admin from './Admin/Admin';
import HomePage from './components/Pages/HomePage'
import axios from 'axios'
import {AuthContextProvider} from './context/AuthContext'
import ProtectedRoutes from './ProtectedRoutes';


axios.defaults.baseURL = `${import.meta.env.url}`
axios.defaults.withCredentials = true
const App = () => {

  return (
    <AuthContextProvider>
    
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />  
        <Route path="*" element={<NotFoundPage />} /> {/* 404 Fallback */}
        <Route path="/login" element={<Login />} />
        
        {/*** Admin protected route */} 
         <Route  element={<ProtectedRoutes />} > 
         <Route path="/admin" element={<Admin />} />
          </Route>
      </Routes>
    </BrowserRouter>

     <ToastContainer 
     position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
     />
    </AuthContextProvider>
    
  )
}

export default App