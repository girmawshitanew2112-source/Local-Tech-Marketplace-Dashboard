import axios from 'axios';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ltm_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authService = {
  login: (payload) => api.post('/auth/login', payload),
  register: (payload) => api.post('/auth/register', payload),
  me: () => api.get('/auth/me')
};

export const marketplaceService = {
  products: (params) => api.get('/products', { params }),
  createProduct: (formData) => api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  orders: () => api.get('/orders'),
  createOrder: (payload) => api.post('/orders', payload),
  users: () => api.get('/users'),
  messages: () => api.get('/messages'),
  notifications: () => api.get('/notifications'),
  adminAnalytics: () => api.get('/analytics/overview'),
  sellerAnalytics: () => api.get('/analytics/seller')
};
