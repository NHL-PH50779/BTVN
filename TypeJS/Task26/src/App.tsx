import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Common/Layout/Header'
import Products from './pages/Products'
import CartProducts from './pages/CartProducts'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<CartProducts />} />
      </Routes>
    </>
  )
}

export default App
