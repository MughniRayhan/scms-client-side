import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router";
import { router } from './Router/Router.jsx';
import 'leaflet/dist/leaflet.css';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


AOS.init({
      once: false, 
    });

  const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className='urbanist-font'>
    <ToastContainer />
    <QueryClientProvider client={queryClient}>
       <AuthProvider>
      <RouterProvider router={router} />
     </AuthProvider>
    </QueryClientProvider>
   </div>
  </StrictMode>,
)
