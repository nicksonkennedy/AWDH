import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SuccessPage from './SuccessPage';
import axios from 'axios'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const HomePage = () => {
  const [customerType, setCustomerType] = useState('');
  const [Encounter, setEncounter] = useState('');
  const [Description, setDescription] = useState('');
  const [Rate, setRate] = useState('');
  const [Suggestion, setSuggestion] = useState('');
  const [Contact, setContact] = useState('');

  //
  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState(false)

  const [status, setstatus] = useState(false)
    
  //useNavigate function
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    //
    try {
      setLoading(true)
    // Add your form submission logic here
    const res = await axios.post("/complaints/add",
      {
      customerType,
      Encounter,
      Description,
      Rate,
      Suggestion,
      Contact
    }
    )
    setstatus(true)
    toast.success("Your Complaint has been submitted")
    
    return;
    } catch (error) {
      toast.error("Error Submitting Complaint. Kindly try again")
      setLoading(false)
      setError(error)
      
    }
  };


  return (
    
      <>
      {
        status ?
        <SuccessPage />
        :
        <>
        {/*****Hhero page */}
         <div className="relative top-20 flex flex-col items-center justify-center  px-4 py-20 ">
  <div className="max-w-6xl mx-auto text-center space-y-6">
    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 font-serif">
      Share Your <span className="text-red-600">Feedback</span> With Us
    </h1>
    
    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Your voice matters in helping us improve our healthcare services. 
      We're committed to addressing your concerns and enhancing patient experience.
    </p>
    
  </div>
 
</div>
      
        {/********************************* */}
        <div className='relative top-16 max-w-2xl mx-auto '>
      

      <form className='space-y-6 p-6 bg-white rounded-lg shadow-md' onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-4 p-4'>
           <label htmlFor='customerType' className='block text-md font-medium text-gray-700'>Are you a Patient or Visitor or Staff</label>
          
          <label className="inline-flex items-center">
        <input
          type="radio"
          name="Patient"
          value="Patient"
          checked={customerType === 'Patient'}
          onChange={(e) => setCustomerType(e.target.value)}
          className="form-radio text-blue-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">Patient</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          name="Visitor"
          value="Visitor"
          checked={customerType === 'Visitor'}
          onChange={(e) => setCustomerType(e.target.value)}
          className="form-radio text-green-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">Visitor</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          name="Staff"
          value="Staff"
          checked={customerType === 'Staff'}
          onChange={(e) => setCustomerType(e.target.value)}
          className="form-radio text-green-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">Staff</span>
      </label>
        </div>


        {/******************************************************* */}
        <div className='flex flex-col space-y-4 p-4'>
           <label htmlFor='customerType' className='block text-md font-medium text-gray-700'>Did you encounter any challenge whiles being served?</label>
          
          <label className="inline-flex items-center">
        <input
          type="radio"
          name="Yes"
          value="Yes"
          checked={Encounter === 'Yes'}
          onChange={(e) => setEncounter(e.target.value)}
          className="form-radio text-blue-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">Yes</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          name="Yes"
          value="No"
          checked={Encounter === 'No'}
          onChange={(e) => setEncounter(e.target.value)}
          className="form-radio text-green-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">No</span>
      </label>

      
        </div>


        {Encounter == "Yes" &&
        <div className='flex flex-col space-y-4 p-4'>
           <label htmlFor='customerType' className='block text-md font-medium text-gray-700'>If YES, What Happened? <span className='ml-4 text-cyan-700'>(Kindly specifiy where and when it happened)</span></label>
          
          <textarea
            id='description'
            name='description'
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            rows='4'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            required
          />
      
        </div>
        }

        {/************************************************* */}
        <div className='flex flex-col space-y-4 p-4'>
           <label htmlFor='customerType' className='block text-md font-medium text-gray-700'>Kindly Rate the service you received</label>
          
          <label className="inline-flex items-center">
        <input
          type="radio"
          name="very_poor"
          value="very_poor"
          checked={Rate === 'very_poor'}
          onChange={(e) => setRate(e.target.value)}
          className="form-radio text-blue-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">Very Poor</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          name="poor"
          value="poor"
          checked={Rate === 'poor'}
          onChange={(e) => setRate(e.target.value)}
          className="form-radio text-blue-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">Poor</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          name="Good"
          value="Good"
          checked={Rate === 'Good'}
          onChange={(e) => setRate(e.target.value)}
          className="form-radio text-blue-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">Good</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          name="Very Good"
          value="Very Good"
          checked={Rate === 'Very Good'}
          onChange={(e) => setRate(e.target.value)}
          className="form-radio text-blue-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">Very Good</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="radio"
          name="Excellent"
          value="Excellent"
          checked={Rate === 'Excellent'}
          onChange={(e) => setRate(e.target.value)}
          className="form-radio text-blue-600 h-5 w-5"
        />
        <span className="ml-2 text-gray-700">Excellent</span>
      </label>

        </div>


        <div className='flex flex-col space-y-4 p-4'>
           <label htmlFor='customerType' className='block text-md font-medium text-gray-700'>Kindly share with us any comment(s)/ Suggestion(s) / Complaint(s)</label>
          
         <textarea
            id='description'
            name='description'
            value={Suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            rows='4'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            required
          />

      
        </div>


        <div className='flex flex-col space-y-4 p-4'>
           <label htmlFor='customerType' className='block text-md font-medium text-gray-700'>
            Please leave your contact  <br/>
            <span className='text-sm'>(i.e Phone Number or Email Address) for further clarification when neccessary) </span>
            <span className='text-red-800'>(optional)</span>
            </label>

         <input
            type='text'
            id='company'
            name='company'
            value={Contact}
            onChange={(e) => setContact(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            
          />

      
        </div>
        

        
        <div className='pt-4'>
          {Error && <h1 className='p-2 w-full text-white bg-orange-800 text-center mb-2'>An error occured, please try again...</h1>}
          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            {Loading ? <Spin indicator={<LoadingOutlined spin />} className='text-white'/> : <>Submit</>}
          </button>
          
        </div>
      </form>
    </div>
        </>
    
      }
      </>
  )
}

export default HomePage