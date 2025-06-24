import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import axiosInstance from "../../api/axiosInstance";

const LoginForm = ({ switchToForgot }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAdminAuth();



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/login', { email, password });
      toast.success('Login Success');
      login();
      window.location.href = '/';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-[1rem]">
      <div>
        <label className="text-[0.875rem] text-[#374151] dark:text-[#D1D5DB]">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-[0.25rem] p-[0.5rem] rounded border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#374151] text-[#1F2937] dark:text-white"
        />
      </div>

      <div>
        <label className="text-[0.875rem] text-[#374151] dark:text-[#D1D5DB]">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mt-[0.25rem] p-[0.5rem] rounded border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#374151] text-[#1F2937] dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full py-[0.5rem] bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded dark:bg-[#FDBA74] dark:hover:bg-[#EA580C]"
      >
        Login
      </button>

      <div className="text-center mt-[0.5rem]">
        <button
          type="button"
          onClick={switchToForgot}
          className="text-[0.875rem] text-[#EA580C] hover:underline dark:text-[#FDBA74]"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;