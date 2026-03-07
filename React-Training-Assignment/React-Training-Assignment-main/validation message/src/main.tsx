import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Basics1 from './Basics.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Basics1 />
  </StrictMode>,
)
