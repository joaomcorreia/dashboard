'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  FileText, 
  Upload,
  Plus,
  Calendar,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { getSummary, getExpenses, markExpensePaid, deleteExpense, type Expense, type Summary } from '../../../../lib/financeApi';

interface SummaryCardProps {
  title: string;
  amount: string;
  period: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, period, icon }) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">€{amount}</p>
        <p className="text-xs text-gray-500">{period}</p>
      </div>
      <div className="text-blue-600">
        {icon}
      </div>
    </div>
  </div>
);

const FinanceDashboard = () => {
  const [monthSummary, setMonthSummary] = useState<Summary | null>(null);
  const [ytdSummary, setYtdSummary] = useState<Summary | null>(null);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [month, ytd, expenses] = await Promise.all([
        getSummary('month'),
        getSummary('ytd'),
        getExpenses()
      ]);
      
      setMonthSummary(month);
      setYtdSummary(ytd);
      setRecentExpenses(expenses.slice(0, 10)); // Get recent 10 expenses
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Set empty data instead of failing
      setMonthSummary({ count: 0, total: '0.00', from_date: '', to_date: '', period: 'month' });
      setYtdSummary({ count: 0, total: '0.00', from_date: '', to_date: '', period: 'ytd' });
      setRecentExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async (expenseId: number) => {
    try {
      await markExpensePaid(expenseId, {});
      await loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error marking expense as paid:', error);
    }
  };

  const handleDeleteExpense = async (expenseId: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(expenseId);
        await loadDashboardData(); // Refresh data
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading finance dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
              <p className="text-gray-600">Manage expenses and track spending</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/admin/finance/import'}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Import CSV</span>
              </button>
              <button 
                onClick={() => window.location.href = '/admin/finance/expenses/new'}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Expense</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            title="This Month"
            amount={monthSummary?.total || '0.00'}
            period={`${monthSummary?.count || 0} expenses`}
            icon={<Calendar className="w-6 h-6" />}
          />
          <SummaryCard
            title="Year to Date"
            amount={ytdSummary?.total || '0.00'}
            period={`${ytdSummary?.count || 0} expenses`}
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <SummaryCard
            title="Unpaid"
            amount={recentExpenses.filter(e => !e.is_paid).reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2)}
            period={`${recentExpenses.filter(e => !e.is_paid).length} expenses`}
            icon={<FileText className="w-6 h-6" />}
          />
          <SummaryCard
            title="Average/Month"
            amount={ytdSummary ? (parseFloat(ytdSummary.total) / 12).toFixed(2) : '0.00'}
            period="This year"
            icon={<DollarSign className="w-6 h-6" />}
          />
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
              <p className="text-sm text-gray-600 mt-1">Latest 10 expenses</p>
            </div>
            <button 
              onClick={() => window.location.href = '/admin/finance/expenses'}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate">{expense.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.vendor_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.category_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      €{parseFloat(expense.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.is_paid ? (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Unpaid
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {expense.receipt && (
                        <button
                          onClick={() => window.open(expense.receipt, '_blank')}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Receipt"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => window.location.href = `/admin/finance/expenses/${expense.id}/edit`}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {!expense.is_paid && (
                        <button
                          onClick={() => handleMarkPaid(expense.id)}
                          className="text-emerald-600 hover:text-emerald-900"
                          title="Mark as Paid"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentExpenses.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No expenses found</p>
                <button 
                  onClick={() => window.location.href = '/admin/finance/expenses/new'}
                  className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your first expense
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;