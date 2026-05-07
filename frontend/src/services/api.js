const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const request = async (path, options = {}) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'API request failed');
  return data;
};

export const api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  products: (query = '') => request(`/products${query}`),
  analytics: () => request('/users/analytics'),
  orders: () => request('/orders'),
  messages: () => request('/messages'),
  notifications: () => request('/messages/notifications')
};
