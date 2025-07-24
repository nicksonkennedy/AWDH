import React, { useContext, useState } from 'react'
import { FaEye, FaLock, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { getLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const loginFunc = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post('/login', { email, password },
        {
         credentials: 'include'}
      )
      
      if (response.data.success) {
      await getLoggedIn(); // This will update both loggedIn and user states
      toast.success(`Welcome back, ${response.data.user.name || 'Admin'}!`);
      navigate('/admin');
    }
      
    } catch (error) {
      setIsLoading(false)
      
      // Handle different error cases
      if (error.response) {
        // The request was made and the server responded with a status code
        const { status, data } = error.response
        
        if (status === 400) {
          if (data.errorMessage) {
            toast.error(data.errorMessage)
          } else {
            toast.error('Invalid email or password')
          }
        } else if (status === 401) {
          toast.error('Unauthorized access')
        } else if (status === 500) {
          toast.error('Server error. Please try again later')
        } else {
          toast.error('Login failed. Please try again')
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('An error occured. Please check your connection')
      } else {
        // Something happened in setting up the request
        toast.error('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative top-[12rem] max-w-md mx-auto text-center space-y-6">
      <h1 className='text-4xl md:text-5xl font-bold text-gray-900 font-serif'>
        Admin <span className="text-red-600">Login</span>
      </h1>
      <FaLock className='mx-auto text-center text-[3rem] text-green-700' />

      <form onSubmit={loginFunc} className='space-y-3 p-6 bg-white rounded-lg shadow-2xl'>
        <div className='flex flex-col space-y-2 p-2'>
          <label htmlFor='email' className='block text-md font-medium text-gray-700 text-left'>
            Email Address
          </label>
          <input
            type='text'
            placeholder='(example: Johndoe@gmail.com)'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-700 focus:border-cyan-700 sm:text-sm'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='flex flex-col space-y-2 p-2'>
          <label htmlFor='password' className='block text-md font-medium text-gray-700 text-left'>
            Password
          </label>
          <div className='relative'>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder='Enter your password'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-700 focus:border-cyan-700 sm:text-sm'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span className='absolute top-3 right-3 cursor-pointer'>
              {showPass 
                ? <FaEyeSlash onClick={() => setShowPass(false)} /> 
                : <FaEye onClick={() => setShowPass(true)} />}
            </span>
          </div>
        </div>

        <button 
          type='submit' 
          className='w-full p-2 text-white bg-cyan-800 hover:bg-cyan-700 font-semibold disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading ? 'Loading.....' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login