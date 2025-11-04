"use client";
import { useState } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";

export default function UserEditForm({ user, onUserUpdated, onCancel }) {
  const [form, setForm] = useState({
    name: user.name || "",
    address: user.address || "",
    profilePicture: user.profilePicture || "",
    status: user.status || "inactive"
  });
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      await api.put(`/admin/accounts/user/${user.id}`, form);
      toast.success("User updated successfully");
      onUserUpdated();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
          <input
            type="text"
            value={user.mobile}
            disabled
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="border p-2 rounded w-full"
            rows="3"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
          <input
            type="text"
            value={form.profilePicture}
            onChange={(e) => setForm({ ...form, profilePicture: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
}