import React from 'react'
import cnt from '../assets/contact.jpg'

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted!")
  }

  return (
    <div className='mt-2'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='w-full sm:w-1/2'>
          <img src={cnt} alt="" className='w-full h-full object-cover' />
        </div>

        <div className='w-full sm:w-1/2'>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
              <input type="tel" id="phone" name="phone" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
