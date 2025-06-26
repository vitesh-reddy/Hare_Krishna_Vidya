import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api/admin`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Check if the error response has a status code
    if (error.response && error.response.status === 401) {

      // Handle 401 Unauthorized error: redirect to login
      toast.loading('Session Expired,\nRedirecting to login...');
      setTimeout(() => {
        toast.dismiss()
        window.location.href = '/login'; 
      }, 1000);      
      // Use window.location.href to force a full page reload and clear state

      // Reject the promise to prevent further processing by the calling function
      return Promise.reject(error);
    }
    // For any other error status code, just re-throw the error
    return Promise.reject(error);
  }
);
export default axiosInstance;