import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './pages/Chat_Container.jsx'
import { Provider } from 'react-redux';
import store from './Redux/Store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
      <Provider store={store}>
      <App />
      </Provider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
