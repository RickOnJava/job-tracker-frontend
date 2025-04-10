// AuthPages.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-white">{label}</label>
    <input {...props} className="p-2 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white" />
  </div>
);

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = type === 'login';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/api/auth/${isLogin ? 'login' : 'register'}`;
    try {
      const res = await axios.post(url, formData);

      dispatch(setAuthUser(res.data));
      
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }} 
      className="w-[50%] max-w-md bg-gradient-to-br from-purple-600 to-indigo-600 p-8 rounded-2xl shadow-2xl"
    >
      <h2 className="text-white text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Welcome Back 👋' : 'Create an Account 🚀'}
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
        )}
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="********" required />
        <button type="submit" className="mt-4 bg-white text-indigo-600 font-semibold py-2 rounded-lg hover:bg-indigo-100 transition-all">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </motion.div>
  );
};

export const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-800 to-purple-900 px-4">
    <AuthForm type="login" />
  </div>
);

export const RegisterPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-800 to-purple-900 px-4">
    <AuthForm type="register" />
  </div>
);
