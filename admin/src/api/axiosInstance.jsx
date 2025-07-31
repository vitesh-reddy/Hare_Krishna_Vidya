import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api/admin`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log(error)
    if (error.response && error.response.status === 401) {
      
      if(error?.response?.request?.responseURL.includes('/login') || error?.response?.request?.responseURL.includes('/me'))
        return Promise.reject(error);

      toast.loading('Session Expired,\nRedirecting to login...');
      setTimeout(() => {
        toast.dismiss()
        window.location.href = '/login'; 
      }, 1000);      

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;