import React, { useState } from 'react';
import { FiUsers, FiAlertTriangle, FiMessageSquare, FiStar, FiPhone } from 'react-icons/fi';
import { BiAnalyse } from 'react-icons/bi';
import useFetch from '../components/Hooks/useFetch';
import Complaint from './Complaint';
import Loader from '../UIComps/Loader';
import ErrorPage from '../UIComps/ErrorPage';
import Analytics from './Analytics';

const Admin = () => {
  const { Data: complaints, loading, error } = useFetch("/complaints/get");
  const [search, setSearch] = useState('')
  // Stats data for the header cards
  const stats = [
    {
      title: "Total Complaints",
      value: complaints?.length || 0,
      icon: <FiMessageSquare className="text-2xl text-blue-500" />,
      bg: "bg-blue-50"
    },
    {
      title: "Positive Encounters",
      value: complaints?.filter(c => c.Encounter === "Yes").length || 0,
      icon: <FiStar className="text-2xl text-green-500" />,
      bg: "bg-green-50"
    },
    {
      title: "Negative Encounters",
      value: complaints?.filter(c => c.Encounter === "No").length || 0,
      icon: <FiAlertTriangle className="text-2xl text-red-500" />,
      bg: "bg-red-50"
    }
  ];

  return (
    <div className="relative top-20 px-4 py-8 md:py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Customer Feedback Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor and analyze customer complaints and feedback</p>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <FiUsers className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Admin Portal</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bg} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-white shadow-xs`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="p-6 bg-white rounded-xl shadow-sm">
           
          <div className="flex items-center space-x-2 mb-4">
          <div className="space-y-2">
  <h1 className="text-lg font-semibold text-gray-700">Filter by Date</h1>
  <div>
    <input 
      type="text" 
      className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
      placeholder="Select a date"
      value={search}
      onChange={e=>setSearch(e.target.value)}
    />
    {console.log(search)}
  </div>
</div>
          
          </div>
        
        </div>

        {/* Complaints Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiMessageSquare className="text-xl text-indigo-500" />
              <h2 className="text-xl font-semibold text-gray-800">Recent Complaints</h2>
            </div>
            <span className="text-sm text-gray-500">
              {complaints?.length || 0} {complaints?.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>

          <div className="space-y-4">
  {loading && <Loader />}
  {error && <ErrorPage />}
  {complaints &&
    complaints
      .filter((item) => {
        if (!search) return true;

        const date = new Date(item.createdAt);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

        return formattedDate.includes(search);
      })
      .map((complaint) => (
        <Complaint key={complaint._id} complaint={complaint} />
      ))}
</div>

          
        </div>
      </div>
    </div>
  );
};

export default Admin;