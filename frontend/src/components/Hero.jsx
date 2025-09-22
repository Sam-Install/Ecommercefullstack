import React from 'react'
import h45 from '../assets/h45.jpg'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='mt-10 justify-center'>

<div className='border flex flex-col sm:flex-row gap-2 items-center'>


        <div className='w-full sm:w-1/2  '>

        <h1 className='text-2xl text-blue-700 text-center'>Welcome To our Thrift Shop</h1>
        <p className='mt-4 text-black font-bold text-center'>Your one stop access to all your fashion needs</p>

     <div className='flex flex-col sm:flex-row items-center justify-center mt-4 gap-2'>

      <Link to='/products'><button className='bg-green-600 text-white px-6 py-2 text-sm rounded'>See More</button></Link>
        <button className='bg-orange-400 text-white px-6 py-2 text-sm rounded'>Contact Us</button>

     </div>

        </div>


        <div className='w-full sm:w-1/2 flex '>

        <img src={h45} alt="" className='w-full h-full' />

        </div>


        </div>

    </div>
  )
}

export default Hero