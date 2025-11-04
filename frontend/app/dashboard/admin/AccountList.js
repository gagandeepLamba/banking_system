"use client";
import { useState } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";
import UserEditForm from "./UserEditForm";

export default function AccountList({ accounts, onRefresh }) {
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = async (accountId) => {
    if (!confirm("Are you sure you want to delete this account?")) return;
    try {
      await api.delete(`/admin/accounts/${accountId}`);
      toast.success("Account deleted successfully");
      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUserUpdated = () => {
    setEditingUser(null);
    onRefresh();
  };

  if (editingUser) {
    return (
      <UserEditForm 
        user={editingUser} 
        onUserUpdated={handleUserUpdated} 
        onCancel={() => setEditingUser(null)} 
      />
    );
  }

  return (
    <div className="bg-white p-6 rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4">All Accounts</h2>
      {accounts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{acc.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{acc?.User?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{acc?.User?.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{acc?.User?.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{acc.accountNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${acc.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      acc.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(acc.User)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(acc.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No accounts found</p>
        </div>
      )}
    </div>
  );
}