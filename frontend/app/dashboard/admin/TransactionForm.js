"use client";
import { useState } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";

export default function TransactionForm({ onTransactionDone }) {
  const [form, setForm] = useState({ 
    accountId: "", 
    type: "credit", 
    amount: "" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.accountId || !form.amount) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (parseFloat(form.amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    
    try {
      const url = form.type === "credit" 
        ? "/admin/transactions/credit" 
        : "/admin/transactions/debit";

      await api.post(url, {
        accountId: parseInt(form.accountId),
        amount: parseFloat(form.amount)
      });

      toast.success(
        `${form.type === "credit" ? "Credit" : "Debit"} transaction successful`,
        { icon: form.type === "credit" ? "💰" : "💸" }
      );
      
      onTransactionDone();
      setForm({ accountId: "", type: "credit", amount: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Transaction failed",
        { icon: "❌" }
      );
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Perform Transaction</h2>
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account ID</label>
          <input
            type="number"
            placeholder="Account ID"
            value={form.accountId}
            onChange={(e) => setForm({ ...form, accountId: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="border p-2 rounded w-full"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <div className="flex items-end">
          <button
            type="submit"
            className={`w-full py-2 rounded transition-colors ${
              form.type === "credit" 
                ? "bg-green-600 hover:bg-green-700 text-white" 
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            {form.type === "credit" ? "Credit" : "Debit"}
          </button>
        </div>
      </form>
    </div>
  );
}