import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '@/context/UserContext.jsx';
import { ReviewProvider } from '@/context/ReviewContext.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ReviewProvider>
          <ToastContainer position="bottom-right" />
          <App />
        </ReviewProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
