"use client";

import React, { useEffect, useState } from "react";
import { RefreshCw, Plus } from "lucide-react";

type SubRow = { id: string; name: string; price: string; status: "active"|"trialing"|"canceled" };

export default function SubscriptionsTab() {
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState<SubRow[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      // For now, use mock data since the API endpoints don't exist yet
      setSubs([
        { id: "sub_001", name: "JCW Pro Plan", price: "€29.99/mo", status: "active" },
        { id: "sub_002", name: "Client Website Plan", price: "€19.99/mo", status: "trialing" },
      ]);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      setSubs([]);
    }
  };

  async function handleSync() {
    setLoading(true);
    try {
      // Mock sync for now - replace with actual API call when available
      await new Promise(resolve => setTimeout(resolve, 800));
      alert("Synced with e-Boekhouden.nl (mock)");
      await loadSubscriptions(); // Reload after sync
    } catch (error) {
      console.error('Sync error:', error);
      alert("Sync failed");
    } finally {
      setLoading(false);
    }
  }

  const filtered = subs.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style={{ maxWidth: 260 }}
            placeholder="Search subscriptions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button 
            className="flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-300 rounded-md hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            onClick={handleSync} 
            disabled={loading}
          >
            <RefreshCw size={14} className="mr-2" />
            {loading ? "Syncing..." : "Sync e-Boekhouden.nl"}
          </button>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
          <Plus size={14} className="mr-2" />
          New Subscription
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(sub => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sub.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    sub.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : sub.status === "trialing" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}