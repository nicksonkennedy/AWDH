import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from './context/AuthContext'

const ProtectedRoutes = () => {
  const { loggedIn, isLoading } = useContext(AuthContext)
  
  useEffect(() => {
    if (!isLoading && !loggedIn) {
      toast.error("Your session has expired. Please login again")
    }
  }, [loggedIn, isLoading])

  if (isLoading) {
    return null; // or a loading spinner
  }

  return loggedIn ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoutes