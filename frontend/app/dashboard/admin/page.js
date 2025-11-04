"use client";
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";
import ProtectedRoute from "../../../components/ProtectedRoute";
import AccountList from "./AccountList";
import CreateAccountForm from "./CreateAccountForm";
import TransactionForm from "./TransactionForm";
import Navbar from "../../../components/Navbar";

export default function AdminDashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      const res = await api.get("/admin/accounts");
      setAccounts(res.data);
    } catch {
      toast.error("Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (loading) return <Loader text="Loading accounts..." />;

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Navbar />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CreateAccountForm onAccountCreated={fetchAccounts} />
          <TransactionForm onTransactionDone={fetchAccounts} />
        </div>

        <AccountList accounts={accounts} onRefresh={fetchAccounts} />
      </div>
    </ProtectedRoute>
  );
}