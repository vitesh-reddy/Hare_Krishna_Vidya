import React, { useState } from 'react';          
import ForgotPasswordForm from './ForgotPasswordForm';
import LoginForm from './LoginForm';

const AuthPage = () => {
  const [mode, setMode] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7ED] via-[#FEF3C7] to-[#FEF9C3] dark:from-[#7C2D12] dark:via-[#B45309] dark:to-[#CA8A04] flex items-center justify-center px-[1rem]">
      <div className="w-full max-w-[24rem] bg-[#FFFFFF]/80 backdrop-blur-md p-[2rem] rounded-[1rem] shadow-lg dark:bg-[#1F2937]/70">
        <h2 className="text-[1.5rem] font-bold text-center text-[#1F2937] dark:text-[#F5F7FD] mb-[1rem]">
          {mode === 'login' ? 'Admin Login' : 'Forgot Password'}
        </h2>

        {mode === 'login' ? (
          <LoginForm switchToForgot={() => setMode('forgot')} />
        ) : (
          <ForgotPasswordForm switchToLogin={() => setMode('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
