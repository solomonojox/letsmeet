import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ContextProvider from './Context/ContextProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppWrapper from './AppWrapper.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <AppWrapper />
      </ContextProvider>
    </Provider>
  </StrictMode>,
)
