import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";

const ForgotPasswordForm = ({ switchToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    toast.loading('Sending Mail');
    try {
      await axiosInstance.post("/forgot-password", { email });
      setTimeout(() => {
        toast.dismiss();
        toast.success('Mail Sent');
        setSubmitted(true);      
      }, 1000);
    } catch (err) {      
      setTimeout(() => {
        toast.dismiss();
        toast.error(err.response?.data?.message || 'Error sending reset link');
      }, 1000);
    }
  };

  return submitted ? (
    <div className="text-center text-[#1F2937] dark:text-[#F5F7FD]">
      A password reset link has been sent to your email.
      <div className="mt-[1rem]">
        <button
          className="text-[0.875rem] text-[#EA580C] hover:underline dark:text-[#FDBA74]"
          onClick={switchToLogin}
        >
          Back to Login
        </button>
      </div>
    </div>
  ) : (
    <form onSubmit={handleRequestReset} className="space-y-[1rem]">
      <div>
        <label className="text-[0.875rem] text-[#374151] dark:text-[#D1D5DB]">Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-[0.25rem] p-[0.5rem] rounded border border-[#D1D5DB] dark:border-[#4B5563] bg-white dark:bg-[#374151] text-[#1F2937] dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full py-[0.5rem] bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded dark:bg-[#FDBA74] dark:hover:bg-[#EA580C]"
      >
        Send Reset Link
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={switchToLogin}
          className="text-[0.875rem] text-[#EA580C] hover:underline dark:text-[#FDBA74]"
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};


export default ForgotPasswordForm