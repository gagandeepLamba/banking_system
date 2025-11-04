'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Navbar from "../../components/Navbar";
import Link from 'next/link';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        // Get user data
        const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/accounts/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(userRes.data);
        setAccountData(userRes.data.account);

        // Get transaction history
        const transactionRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/accounts/transactions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTransactions(transactionRes.data.transactions || []);
      } catch (err) {
        toast.error('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className='p-8'>
        <Navbar />
        <div className='bg-white p-6 rounded shadow'>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <Navbar />
      <h1 className='text-2xl font-bold mb-6'>User Dashboard</h1>
      
      <div className='mb-6'>
        <Link href='/dashboard/profile' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block'>
          Update Profile
        </Link>
      </div>
      
      {userData && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='bg-white p-6 rounded shadow'>
            <h2 className='text-xl font-semibold mb-4'>Personal Information</h2>
            <div className='space-y-2'>
              <p><span className='font-medium'>Name:</span> {userData.name}</p>
              <p><span className='font-medium'>Email:</span> {userData.email}</p>
              <p><span className='font-medium'>Mobile:</span> {userData.mobile}</p>
              <p><span className='font-medium'>Status:</span> {userData.status}</p>
              {userData.address && <p><span className='font-medium'>Address:</span> {userData.address}</p>}
            </div>
          </div>
          
          {accountData && (
            <div className='bg-white p-6 rounded shadow'>
              <h2 className='text-xl font-semibold mb-4'>Account Information</h2>
              <div className='space-y-2'>
                <p><span className='font-medium'>Account Number:</span> {accountData.accountNumber}</p>
                <p><span className='font-medium'>Balance:</span> ${accountData.balance}</p>
                <p><span className='font-medium'>Status:</span> {accountData.status}</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className='bg-white p-6 rounded shadow'>
        <h2 className='text-xl font-semibold mb-4'>Transaction History</h2>
        {transactions.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Balance After</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.type.toUpperCase()}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      ${transaction.amount}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      ${transaction.balanceAfter}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-gray-500'>No transactions found</p>
        )}
      </div>
    </div>
  );
}