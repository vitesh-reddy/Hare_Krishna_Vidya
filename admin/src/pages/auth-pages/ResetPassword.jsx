import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }    

    try {
      const res = await axiosInstance.post('/reset-password', { token, newPassword });
      toast.loading('Password reset successfully. Redirecting to login');
      setTimeout(() => { 
        toast.dismiss();
        navigate('/login')
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-[1rem] bg-gradient-to-br from-[#FFF7ED] via-[#FEF3C7] to-[#FEF9C3] dark:from-[#7C2D12] dark:via-[#B45309] dark:to-[#CA8A04]">
      <div className="w-full max-w-[24rem] bg-[#FFFFFF]/80 backdrop-blur-md p-[2rem] rounded-[1rem] shadow-lg dark:bg-[#1F2937]/70">
        <h2 className="text-[1.5rem] font-bold text-center text-[#1F2937] dark:text-[#F5F7FD] mb-[1rem]">
          Reset Password
        </h2>

        {message ? (
          <div className="text-center text-green-600 dark:text-green-400">{message}</div>
        ) : (
          <form onSubmit={handleReset} className="space-y-[1rem]">
            <div>
              <label className="text-sm text-[#374151] dark:text-[#D1D5DB]">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full mt-[0.25rem] p-[0.5rem] rounded border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#374151] text-[#1F2937] dark:text-white"
              />
            </div>

            <div>
              <label className="text-sm text-[#374151] dark:text-[#D1D5DB]">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mt-[0.25rem] p-[0.5rem] rounded border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#374151] text-[#1F2937] dark:text-white"
              />
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

            <button
              type="submit"
              className="w-full py-[0.5rem] bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded dark:bg-[#FDBA74] dark:hover:bg-[#EA580C]"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
