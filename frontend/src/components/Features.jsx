import React from 'react'
import ref from '../assets/refund.jpg'
import dat from '../assets/data.jpg'
import del from '../assets/delivery.jpg'

const Features = () => {
  const features = [
    {
      img: ref,
      title: "Refund",
      description: "We offer refund policy that runs within 48 hours"
    },
    {
      img: dat,
      title: "Data Protection",
      description: "We ensure your data is protected 24/7"
    },
    {
      img: del,
      title: "Delivery",
      description: "We deliver countrywide"
    }
  ]

  return (
    <div className="mt-10 px-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Our Policy</h1>
      <p className='text-center mb-3'>We operate with particular framework to help us be apart from others</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg overflow-hidden p-4 transition-transform hover:scale-105"
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="w-24 h-24 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Features
