'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Login successful');
      router.push(res.data.user.role === 'admin' ? '/dashboard/admin' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl shadow-md w-96'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Login</h2>
        <input className='border p-2 w-full mb-4' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className='border p-2 w-full mb-4' type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className='bg-blue-600 text-white py-2 rounded w-full'>Login</button>
      </form>
    </div>
  );
}
