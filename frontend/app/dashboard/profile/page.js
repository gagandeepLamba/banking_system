'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Navbar from "../../../components/Navbar";

export default function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/accounts/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData({
          name: res.data.name,
          email: res.data.email,
          mobile: res.data.mobile,
          address: res.data.address || '',
          profilePicture: res.data.profilePicture || ''
        });
      } catch (err) {
        toast.error('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/accounts/profile`, {
        name: userData.name,
        address: userData.address,
        profilePicture: userData.profilePicture
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className='p-8'>
        <Navbar />
        <div className='bg-white p-6 rounded shadow'>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <Navbar />
      <h1 className='text-2xl font-bold mb-6'>Update Profile</h1>
      
      <div className='bg-white p-6 rounded shadow max-w-2xl'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
            <input
              type='text'
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className='border p-2 rounded w-full'
              required
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input
              type='email'
              value={userData.email}
              disabled
              className='border p-2 rounded w-full bg-gray-100'
            />
            <p className='text-xs text-gray-500 mt-1'>Email cannot be changed</p>
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Mobile</label>
            <input
              type='text'
              value={userData.mobile}
              disabled
              className='border p-2 rounded w-full bg-gray-100'
            />
            <p className='text-xs text-gray-500 mt-1'>Mobile number cannot be changed</p>
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
            <textarea
              value={userData.address}
              onChange={(e) => setUserData({...userData, address: e.target.value})}
              className='border p-2 rounded w-full'
              rows='3'
              placeholder='Enter your address'
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Profile Picture URL</label>
            <input
              type='text'
              value={userData.profilePicture}
              onChange={(e) => setUserData({...userData, profilePicture: e.target.value})}
              className='border p-2 rounded w-full'
              placeholder='Enter profile picture URL'
            />
          </div>
          
          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={updating}
              className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50'
            >
              {updating ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}