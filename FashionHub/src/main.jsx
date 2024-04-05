import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FashionContextProvider from './context/FashionContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FashionContextProvider>
      <App />
    </FashionContextProvider>
  </React.StrictMode>,
)
