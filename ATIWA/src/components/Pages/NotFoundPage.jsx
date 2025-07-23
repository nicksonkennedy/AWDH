import React from 'react'
import {Link} from "react-router-dom"
export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800">
  <div className='relative top-[10rem] text-center font-mono'>
    {/* Animated 404 Text */}
    <h1 className='text-6xl font-bold text-white animate-pulse'>ERROR 404</h1>
    
    {/* Your Original Text (Styled Better) */}
    <p className='text-2xl text-gray-200 mt-4'>Page Not Found</p>
    
    {/* Fun Subtitle */}
    <p className='text-xl text-purple-300 mt-6'>
      Oops! The page you're looking for has vanished into the void.
    </p>
    
    {/* Home Button */}
    <Link to='/'
      className="relative top-24 px-6 py-3 bg-white/20 backdrop-blur-md rounded-lg text-white 
                border border-white/30 hover:bg-white/30 transition-all"
    >
      Beam Me Home
    </Link >
    
    {/* Optional: Floating Particles (CSS Magic) */}
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`
          }}
        />
      ))}
    </div>
  </div>
</div>
  )
}
