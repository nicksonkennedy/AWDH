import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftEllipsisIcon, 
  StarIcon, 
  PhoneIcon,
  CalendarIcon,
  UserCircleIcon,
  ExclamationCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/solid';

const Complaint = ({ complaint }) => {
  if (!complaint) return null;

  // Determine background and border color based on encounter
  const getEncounterStyle = (encounter) => {
    if (complaint.Encounter === "Yes") {
      return {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-800 font-bold'
      };
    } else {
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-800'
      };
    }
  };

  const encounterStyle = getEncounterStyle(complaint.Encounter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  // Render star rating
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon 
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`rounded-xl shadow-lg overflow-hidden p-6 mb-10 border-l-4 ${encounterStyle.bg} ${encounterStyle.border} hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="space-y-8">
        {/* Date */}
        <motion.div 
          custom={0}
          variants={itemVariants}
          className="flex items-center text-gray-600"
        >
          <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
          <span className="font-medium">Date: </span>
          <span className="ml-5">{new Date(complaint.createdAt).toLocaleDateString()}</span>
        </motion.div>

        {/* Customer Type */}
        <motion.div 
          custom={1}
          variants={itemVariants}
          className="flex items-center text-gray-600"
        >
          <UserCircleIcon className="h-5 w-5 mr-2 text-green-500" />
          <p className="font-medium">Customer Type: </p>
          <p className="ml-5 capitalize">{complaint.customerType}</p>
        </motion.div>

        {/* Encounter */}
        <motion.div 
          custom={2}
          variants={itemVariants}
          className="flex items-center text-gray-600"
        >
          <ExclamationCircleIcon className="h-5 w-5 mr-2 text-green-500" />
          <span className="font-medium">Encounter: </span>
          <span className={`ml-5 capitalize ${encounterStyle.text}`}>
            {complaint.Encounter}
          </span>
        </motion.div>

        {/* Problem Description */}
        <motion.div 
          custom={3}
          variants={itemVariants}
          className="text-gray-600"
        >
          <div className="flex items-start">
            <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
            <div>
              <span className="font-medium">Problem Description: </span>
              <p className="mt-1 text-gray-700 bg-white bg-opacity-70 p-3 rounded-lg">
                {complaint.Description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Service Rating */}
        <motion.div 
          custom={4}
          variants={itemVariants}
          className="flex items-center text-gray-600"
        >
          <StarIcon className="h-5 w-5 mr-2 text-green-500" />
          <span className="font-medium">Service Rating: </span>
          <span className="ml-2">{renderRating(complaint.Rate)}</span>
        </motion.div>

        {/* Suggestions/Complaints */}
        <motion.div 
          custom={5}
          variants={itemVariants}
          className="text-gray-600"
        >
          <div className="flex items-start">
            <LightBulbIcon className="h-5 w-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
            <div>
              <span className="font-medium">Suggestions/Complaints: </span>
              <p className="mt-1 text-gray-700 bg-white bg-opacity-70 p-3 rounded-lg">
                {complaint.Suggestion || 'No suggestions provided'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div 
          custom={6}
          variants={itemVariants}
          className="flex items-center text-gray-600"
        >
          <PhoneIcon className="h-5 w-5 mr-2 text-green-500" />
          <span className="font-medium">Contact: </span>
          <span className="ml-5">{complaint.Contact || 'Not provided'}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Complaint;