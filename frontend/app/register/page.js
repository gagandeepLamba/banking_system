'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function Register() {
  const [form, setForm] = useState({name:'',email:'',mobile:'',password:''});
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, form);
      toast.success('Registered. Await admin activation.');
      router.push('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };
  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-xl shadow-md w-96'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Register</h2>
        <input className='border p-2 w-full mb-3' placeholder='Name' value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className='border p-2 w-full mb-3' placeholder='Email' value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input className='border p-2 w-full mb-3' placeholder='Mobile' value={form.mobile} onChange={(e)=>setForm({...form,mobile:e.target.value})} />
        <input className='border p-2 w-full mb-4' type='password' placeholder='Password' value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className='bg-green-600 text-white py-2 rounded w-full'>Register</button>
      </form>
    </div>
  );
}
