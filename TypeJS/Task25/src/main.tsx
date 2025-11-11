import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartContextProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
 <CartContextProvider>
   <StrictMode>
    <App />
  </StrictMode>,
 </CartContextProvider>
)
