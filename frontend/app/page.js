import Link from 'next/link';
export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Bank Account Management</h1>
      <div className='space-x-4'>
        <Link href='/login' className='text-blue-600'>Login</Link>
        <Link href='/register' className='text-green-600'>Register</Link>
      </div>
    </main>
  );
}
