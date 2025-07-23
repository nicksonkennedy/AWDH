import React from 'react'

const SuccessPage = () => {
  return (
   <div className="relative top-20 flex flex-col items-center justify-center px-4 py-12">
  <div className="max-w-4xl mx-auto text-center space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
    {/* Animated checkmark icon */}
    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
      Your <span className="text-red-600">Feedback</span> Has Been Submitted
    </h1>
    
    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Thank you for helping us improve. We've received your complaint/suggestion and will respond within 3 working days.
    </p>

    {/* Minimal next steps info */}
    <div className="pt-4 text-sm text-gray-500 max-w-md mx-auto">
      <p>Reference ID: <span className="font-mono font-medium">COMP-{Math.floor(Math.random() * 10000)}</span></p>
    </div>

    
  </div>
</div>
  )
}

export default SuccessPage