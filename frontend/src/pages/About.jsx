import React from 'react'
import thr from '../assets/thrift.jpg'

const About = () => {
  return (
    <div className='mt-2'>

        <div className='flex flex-col sm:flex-row gap-4'>

            <div className='w-full sm:w-1/2'>

            <img src={thr} alt="" className='w-full h-full object-contain' />

            </div>

            <div className='w-full sm:w-1/2'>

            <h1 className='text-center font-bold'>About Us</h1>

<p>Welcome to <strong>ThriftStore</strong> — where style meets sustainability. We believe fashion should not only look good, but feel good, too. Founded to offer high-quality clothing at affordable prices, ThriftStore is your trusted online destination for unique, stylish pieces that value both people and the planet.</p>

<p>We carefully curate each item to ensure excellent condition, great style, and lasting quality. Many of our pieces are gently used or upcycled, helping reduce waste and promoting a more sustainable fashion cycle.</p>

<p>Your shopping experience matters to us. From easy browsing to fast delivery and hassle-free returns, we strive to make shopping simple and enjoyable. We also take your privacy seriously and work to protect your personal information.</p>

<p>More than a store, we're a community of fashion lovers who care. By choosing ThriftStore, you’re supporting ethical fashion, smart consumption, and a better future for our environment. Thank you for shopping with us — let’s build a wardrobe that matters.</p>


            </div>

        </div>

    </div>
  )
}

export default About