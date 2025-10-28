import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api';

const financeApi = axios.create({
  baseURL: `${API_BASE}/finance`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
financeApi.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface Vendor {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  tax_id?: string;
  note?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  type: 'expense' | 'income';
  created_at: string;
  updated_at: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  last4?: string;
  provider?: string;
  note?: string;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: number;
  date: string;
  vendor: number;
  vendor_name: string;
  category: number;
  category_name: string;
  description: string;
  amount: string;
  currency: string;
  payment_method?: number;
  payment_method_name?: string;
  paid_date?: string;
  receipt?: string;
  note?: string;
  is_paid: boolean;
  external_system?: string;
  external_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Summary {
  count: number;
  total: string;
  from_date: string;
  to_date: string;
  period: string;
}

export interface ExpenseFilters {
  from?: string;
  to?: string;
  vendor_id?: number;
  category_id?: number;
  method_id?: number;
  paid?: boolean;
}

// API Functions

// Vendors
export const getVendors = async (): Promise<Vendor[]> => {
  const response = await financeApi.get('/vendors/');
  return response.data;
};

export const createVendor = async (vendor: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>): Promise<Vendor> => {
  const response = await financeApi.post('/vendors/', vendor);
  return response.data;
};

export const updateVendor = async (id: number, vendor: Partial<Vendor>): Promise<Vendor> => {
  const response = await financeApi.patch(`/vendors/${id}/`, vendor);
  return response.data;
};

export const deleteVendor = async (id: number): Promise<void> => {
  await financeApi.delete(`/vendors/${id}/`);
};

// Categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await financeApi.get('/categories/');
  return response.data;
};

export const createCategory = async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> => {
  const response = await financeApi.post('/categories/', category);
  return response.data;
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category> => {
  const response = await financeApi.patch(`/categories/${id}/`, category);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await financeApi.delete(`/categories/${id}/`);
};

// Payment Methods
export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await financeApi.get('/methods/');
  return response.data;
};

export const createPaymentMethod = async (method: Omit<PaymentMethod, 'id' | 'created_at' | 'updated_at'>): Promise<PaymentMethod> => {
  const response = await financeApi.post('/methods/', method);
  return response.data;
};

export const updatePaymentMethod = async (id: number, method: Partial<PaymentMethod>): Promise<PaymentMethod> => {
  const response = await financeApi.patch(`/methods/${id}/`, method);
  return response.data;
};

export const deletePaymentMethod = async (id: number): Promise<void> => {
  await financeApi.delete(`/methods/${id}/`);
};

// Expenses
export const getExpenses = async (filters?: ExpenseFilters): Promise<Expense[]> => {
  const response = await financeApi.get('/expenses/', { params: filters });
  return response.data;
};

export const createExpense = async (expense: FormData): Promise<Expense> => {
  const response = await financeApi.post('/expenses/', expense, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateExpense = async (id: number, expense: FormData): Promise<Expense> => {
  const response = await financeApi.patch(`/expenses/${id}/`, expense, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteExpense = async (id: number): Promise<void> => {
  await financeApi.delete(`/expenses/${id}/`);
};

export const markExpensePaid = async (id: number, data: { paid_date?: string; reference?: string }): Promise<any> => {
  const response = await financeApi.post(`/expenses/${id}/mark_paid/`, data);
  return response.data;
};

// CSV Import
export const importExpensesCSV = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await financeApi.post('/expenses/import_csv/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Summary
export const getSummary = async (period: 'month' | 'ytd'): Promise<Summary> => {
  const response = await financeApi.get('/expenses/summary/', { params: { period } });
  return response.data;
};

export default financeApi;