"use client";
import { useState } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";

export default function CreateAccountForm({ onAccountCreated }) {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    mobile: "",
    profilePicture: "",
    initialBalance: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/accounts", {
        ...form,
        initialBalance: parseFloat(form.initialBalance) || 0
      });
      toast.success("Account created successfully");
      onAccountCreated();
      setForm({ 
        name: "", 
        email: "", 
        mobile: "",
        profilePicture: "",
        initialBalance: 0
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create New Account</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Full Name"
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
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
          <input
            type="text"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
          <input
            type="text"
            placeholder="Profile Picture URL"
            value={form.profilePicture}
            onChange={(e) => setForm({ ...form, profilePicture: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Initial Balance</label>
          <input
            type="number"
            placeholder="Initial Balance"
            value={form.initialBalance}
            onChange={(e) => setForm({ ...form, initialBalance: e.target.value })}
            className="border p-2 rounded w-full"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}