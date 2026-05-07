import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function RevenueChart({ data = [] }) {
  const chartData = data.length ? data.map((item) => ({ month: item._id, revenue: Math.round(item.revenue), orders: item.orders })) : [
    { month: 'Jan', revenue: 12000, orders: 24 }, { month: 'Feb', revenue: 18000, orders: 32 }, { month: 'Mar', revenue: 24000, orders: 41 }, { month: 'Apr', revenue: 31000, orders: 58 }
  ];
  return <div className="chart-card"><h2>Revenue trend</h2><ResponsiveContainer width="100%" height={260}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" opacity={0.18} /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="revenue" radius={[10, 10, 0, 0]} fill="var(--accent)" /></BarChart></ResponsiveContainer></div>;
}

export function RoleChart({ data = [] }) {
  const colors = ['#7c3aed', '#06b6d4', '#22c55e'];
  const chartData = data.length ? data.map((item) => ({ name: item._id, value: item.count })) : [{ name: 'buyers', value: 42 }, { name: 'sellers', value: 12 }, { name: 'admins', value: 3 }];
  return <div className="chart-card"><h2>User mix</h2><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={chartData} dataKey="value" nameKey="name" outerRadius={90} label>{chartData.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>;
}
