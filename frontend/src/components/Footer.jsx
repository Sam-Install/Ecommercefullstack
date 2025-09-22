import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    
    <div className='mt-10'>

      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-white bg-green-800">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                   <h1 className='text-green-500'>ThriftStore</h1>
                    <p className="mt-6 text-sm">
                        ThriftStore is your go-to destination for stylish, affordable fashion with a conscience. We curate high-quality clothing pieces and unique finds so you can express your personal style without breaking the bank. At ThriftStore, we believe in sustainability, quality, and making fashion accessible to everyone. Shop with us and discover fashion that feels good—both for you and the planet.
                    </p>
                </div>
                <div className="flex-col sm:flex-row flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-bold mb-5 text-white ">Company</h2>
                        <ul className="text-sm space-y-4">
                        <Link to='/'><li  href="/">Home</li></Link> 
                        <Link to='/about'><li  href="/about">About</li></Link> 
                        <Link to='/products'><li href="/products">Products</li></Link> 
                        <Link to='/contact'><li href="/contact">Contact</li></Link> 
                            
                            
                            
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold mb-5 text-white">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+254 757 85433333</p>
                            <p>thriftstore@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2025 © ThriftStore
            </p>
        </footer>

</div>
     
  )
}

export default Footer