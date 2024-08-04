import React, { useState } from 'react';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-6">{isLogin ? 'Login' : 'Signup'}</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none" 
              required 
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm mb-2">Confirm Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none" 
                required 
              />
            </div>
          )}
          <button className="w-full py-2 bg-blue-600 rounded mt-4">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button 
            onClick={handleToggle} 
            className="text-blue-400 underline">
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
