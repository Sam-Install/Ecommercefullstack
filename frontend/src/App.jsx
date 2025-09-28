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
import Login from './components/admin/Login'
import Dashboard from './components/admin/Dashboard'
import Show from './components/admin/products/Show'
import Create from './components/admin/products/Create'
import Edit from './components/admin/products/Edit'
import ShowBestSeller from './components/admin/BestSeller/ShowBestSeller'
import CreateBestSeller from './components/admin/BestSeller/CreateBestSeller'
import EditBestSeller from './components/admin/BestSeller/EditBestSeller'
import ShowLatest from './components/admin/Latest/ShowLatest'
import CreateLatest from './components/admin/Latest/CreateLatest'
import EditLatest from './components/admin/Latest/EditLatest'


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

<Navbar/>

<Routes>

<Route path='' element={<Home/>} />
<Route path='/products' element={<Products/>} />
<Route path='/products/:id' element={<ProductDetail/>} /> 
<Route path='/about' element={<About/>} />
<Route path='/contact' element={<Contact/>} />
<Route path='/cart' element={<Cart/>} />
<Route path='/check' element={<Checkout/>} />
<Route path='/login' element={<Login/>} />
<Route path='/dashboard' element={<Dashboard/>} />
<Route path='/admin/show' element={<Show/>} />
<Route path='/admin/create' element={<Create/>} />
<Route path='/admin/edit/:id' element={<Edit/>} />
<Route path='/admin/showB' element={<ShowBestSeller/>} />
<Route path='/admin/createB' element={<CreateBestSeller/>} />
<Route path='/admin/editbestseller/:id' element={<EditBestSeller/>} />
<Route path='/admin/ShowL' element={<ShowLatest/>} />
<Route path='/admin/CreateL' element={<CreateLatest/>} />
<Route path='/admin/editlatest/:id' element={<EditLatest/>} />


</Routes>

<Footer/>

    </div>
  )
}

export default App