import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ContextProvider from './Context/ContextProvider.jsx'
import { AuthProvider } from './Context/auth/AuthProvider.tsx'
import AppWrapper from './AppWrapper.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
// import SignalRProvider from './Context/SignalRProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
          <ContextProvider>
            <AppWrapper />
          </ContextProvider>
        {/* <SignalRProvider>
        </SignalRProvider> */}
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
