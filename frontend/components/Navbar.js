'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar(){
  const [user,setUser]=useState(null);
  const router=useRouter();
  
  useEffect(()=>{ 
    const u=localStorage.getItem('user'); 
    if(u) setUser(JSON.parse(u)); 
  },[]);
  
  const logout=()=>{ 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    router.push('/login'); 
  };
  
  return (
    <nav className='bg-blue-700 text-white p-4 flex justify-between'>
      <Link href='/' className='font-bold'>Bank System</Link>
      <div className='flex items-center'>
        {user? <>
          {user.role==='admin' && <Link href='/dashboard/admin' className='mr-4 hover:underline'>Admin</Link>}
          <Link href='/dashboard' className='mr-4 hover:underline'>Dashboard</Link>
          <Link href='/dashboard/profile' className='mr-4 hover:underline'>Profile</Link>
          <button onClick={logout} className='bg-red-500 px-3 py-1 rounded hover:bg-red-600'>Logout</button>
        </> : <>
          <Link href='/login' className='mr-4 hover:underline'>Login</Link>
          <Link href='/register' className='hover:underline'>Register</Link>
        </>}
      </div>
    </nav>
  );
}