import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Intermediate from "./Intermediate";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Intermediate />
  </StrictMode>,
)
