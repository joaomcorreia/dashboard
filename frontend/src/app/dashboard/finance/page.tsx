'use client';

import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  CreditCard,
  Receipt,
  FileText,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react';

const mockFinanceData = {
  totalRevenue: 12450.75,
  monthlyRevenue: 2340.50,
  totalExpenses: 8920.25,
  monthlyExpenses: 1680.75,
  profit: 3530.50,
  monthlyProfit: 659.75,
  revenueGrowth: 15.3,
  expenseGrowth: -8.2,
  profitGrowth: 22.7
};

const recentTransactions = [
  {
    id: 1,
    type: 'income',
    description: 'Website Hosting - Premium Plan',
    amount: 19.99,
    date: '2025-10-28',
    category: 'Website Services'
  },
  {
    id: 2,
    type: 'income',
    description: 'Business Cards - Premium Order',
    amount: 89.50,
    date: '2025-10-27',
    category: 'Print Services'
  },
  {
    id: 3,
    type: 'expense',
    description: 'Marketing Campaign - Google Ads',
    amount: 150.00,
    date: '2025-10-26',
    category: 'Marketing'
  },
  {
    id: 4,
    type: 'income',
    description: 'Brochure Design & Print',
    amount: 245.00,
    date: '2025-10-25',
    category: 'Print Services'
  },
  {
    id: 5,
    type: 'expense',
    description: 'Server Infrastructure',
    amount: 79.99,
    date: '2025-10-24',
    category: 'Infrastructure'
  }
];

const monthlyData = [
  { month: 'Jan', revenue: 1200, expenses: 800, profit: 400 },
  { month: 'Feb', revenue: 1350, expenses: 850, profit: 500 },
  { month: 'Mar', revenue: 1100, expenses: 750, profit: 350 },
  { month: 'Apr', revenue: 1450, expenses: 900, profit: 550 },
  { month: 'May', revenue: 1600, expenses: 950, profit: 650 },
  { month: 'Jun', revenue: 1750, expenses: 1000, profit: 750 },
  { month: 'Jul', revenue: 1850, expenses: 1100, profit: 750 },
  { month: 'Aug', revenue: 2100, expenses: 1250, profit: 850 },
  { month: 'Sep', revenue: 2200, expenses: 1300, profit: 900 },
  { month: 'Oct', revenue: 2340, expenses: 1680, profit: 660 },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
        <p className="mt-2 text-gray-600">
          Track your revenue, expenses, and financial performance across all JCW services.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${mockFinanceData.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{mockFinanceData.revenueGrowth}% this month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">${mockFinanceData.totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingDown className="w-4 h-4 mr-1" />
                {mockFinanceData.expenseGrowth}% this month
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900">${mockFinanceData.profit.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{mockFinanceData.profitGrowth}% this month
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">${mockFinanceData.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">
                Revenue this month
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Revenue chart will be displayed here</p>
              <p className="text-xs text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Expense Breakdown</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-center">
              <PieChart className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Expense breakdown chart will be displayed here</p>
              <p className="text-xs text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Receipt className="w-8 h-8 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Generate Report</p>
              <p className="text-sm text-gray-500">Create financial summary</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-8 h-8 text-green-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Export Data</p>
              <p className="text-sm text-gray-500">Download CSV/PDF</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Target className="w-8 h-8 text-purple-600 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Set Budget Goals</p>
              <p className="text-sm text-gray-500">Plan your finances</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}