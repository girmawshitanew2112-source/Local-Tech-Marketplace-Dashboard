import { CategoryChart, RevenueChart } from '../components/Charts.jsx';
import StatCard from '../components/StatCard.jsx';
import { stats } from '../data/mockData.js';

export default function AdminDashboard() {
  return <><div className="page-title"><h1>Admin Dashboard</h1><p>Marketplace governance, user management, product moderation, and revenue analytics.</p></div><section className="stats-grid">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section><section className="grid two"><RevenueChart /><CategoryChart /></section><div className="panel"><h3>Admin Tasks</h3><div className="task">Verify 4 sellers</div><div className="task">Review 7 flagged listings</div><div className="task">Publish weekly marketplace report</div></div></>;
}
