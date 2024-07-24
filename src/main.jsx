import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { ContextProvider } from './pages/Chat_Container.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ContextProvider>
      <App />
      </ContextProvider>
    </HashRouter>
  </React.StrictMode>,
)
