import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ContextProvider from './Context/ContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppWrapper from './AppWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <AppWrapper />
    </ContextProvider>
  </StrictMode>,
)
