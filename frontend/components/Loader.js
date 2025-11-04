'use client';
export default function Loader({ text='Loading...' }) {
  return <div className='flex items-center justify-center h-screen'><div className='animate-spin rounded-full h-8 w-8 border-b-2'></div><span className='ml-3'>{text}</span></div>;
}
