import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

<Navbar/>

<Routes>

<Route path='' element={<Home/>} />
<Route path='/products' element={<Products/>} />
<Route path='/product/:id' element={<ProductDetail/>} /> 
<Route path='/about' element={<About/>} />
<Route path='/contact' element={<Contact/>} />
<Route path='/cart' element={<Cart/>} />
<Route path='/check' element={<Checkout/>} />

</Routes>

<Footer/>

    </div>
  )
}

export default App