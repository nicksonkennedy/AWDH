import React from 'react'
import useFetch from '../components/Hooks/useFetch'
import Loader from '../UIComps/Loader'
import { FaUsers } from "react-icons/fa6";
const Analytics = () => {
    const {Data:complaints,loading,error,} = useFetch("/complaints/get")


  return (
    <div className=''>
        {complaints && 
        
        <div className='flex justify-between'>
            <div className=''>
            <FaUsers />
            <h1>Complaints Received</h1>
            <h3>{complaints.length}</h3>
        </div>

        <div className=''>
            <FaUsers />
            <h1>Number Of Complaints Received Today</h1>
            <h3>0</h3>
        </div>

        <div className=''>
            <FaUsers />
            <h1>Good Ratings</h1>
            <h3>0</h3>
        </div>
            <div className=''>
            <FaUsers />
            <h1>Bad Ratings</h1>
            <h3>0</h3>
        </div>
        </div>
        
        }
    </div>
  )
}

export default Analytics