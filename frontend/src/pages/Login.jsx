import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: 'admin@localtech.dev', password: 'password123', role: 'buyer' });
  const [error, setError] = useState('');
  const submit = async (event) => {
    event.preventDefault(); setError('');
    try {
      const user = mode === 'login' ? await login(form) : await register(form);
      navigate(user.role === 'admin' ? '/admin' : user.role === 'seller' ? '/seller' : '/buyer');
    } catch (err) { setError(err.response?.data?.message || err.message); }
  };
  return <section className="auth-page"><form className="auth-card" onSubmit={submit}>
    <Link to="/" className="logo">LocalTech</Link><h1>{mode === 'login' ? 'Sign in' : 'Create account'}</h1><p>Use demo accounts from the README or register a new buyer/seller.</p>
    {mode === 'register' && <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />}
    <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
    <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
    {mode === 'register' && <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="buyer">Buyer</option><option value="seller">Seller</option></select>}
    {error && <div className="error">{error}</div>}<button className="wide">{mode === 'login' ? 'Login' : 'Register'}</button>
    <button type="button" className="link-button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Need an account?' : 'Already registered?'}</button>
  </form></section>;
}
