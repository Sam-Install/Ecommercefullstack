import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from '../context/CartContext';  

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { cart } = useCart(); 


  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='mt-2 flex items-center justify-between py-5 font-medium'>

      <h1 className='text-emerald-600'>ThriftStore</h1>

      <ul className='hidden sm:flex gap-5 text-sm text-black'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-blue-500 hidden'/>
        </NavLink>

        <NavLink to='/products' className='flex flex-col items-center gap-1'>
          <p>Products</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-blue-500 hidden' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-blue-500 hidden' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-blue-500 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <IoSearch className='text-2xl cursor-pointer' />

        <div className='group relative'>
          <CgProfile className='text-2xl cursor-pointer' />
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-blue-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>

    
        <Link to='/cart' className='relative'>
          <BsCart className='text-2xl' />
          {totalItems > 0 && (
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
              {totalItems}
            </p>
          )}
        </Link>

        <IoMdMenu onClick={() => setVisible(true)} className='text-2xl sm:hidden' />
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-black'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
            <FaArrowLeft className='text-2xl'/>
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6 border'>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/products' className='py-2 pl-6 border'>Products</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 pl-6 border'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/contact' className='py-2 pl-6 border'>Contact</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
