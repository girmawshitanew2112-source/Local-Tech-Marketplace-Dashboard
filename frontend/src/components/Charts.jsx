import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { categoryData, chartData } from '../data/mockData.js';

const colors = ['#7c3aed', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444'];

export function RevenueChart() {
  return <div className="panel"><h3>Revenue & Orders</h3><ResponsiveContainer width="100%" height={280}><AreaChart data={chartData}><defs><linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.75}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" opacity={0.15}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#revenue)"/><Bar dataKey="orders" fill="#06b6d4" radius={[8,8,0,0]}/></AreaChart></ResponsiveContainer></div>;
}

export function CategoryChart() {
  return <div className="panel"><h3>Category Mix</h3><ResponsiveContainer width="100%" height={280}><PieChart><Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={4}>{categoryData.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>;
}
