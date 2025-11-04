'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function ProtectedRoute({ children, allowedRoles=[] }) {
  const router = useRouter();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')||'null');
    if(!token || !user) { router.push('/login'); return; }
    if(allowedRoles.length && !allowedRoles.includes(user.role)) { router.push('/'); }
  },[]);
  return <>{children}</>;
}
