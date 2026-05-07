import { CategoryChart, RevenueChart } from '../components/Charts.jsx';
import ProductTable from '../components/ProductTable.jsx';
import StatCard from '../components/StatCard.jsx';
import { notifications, stats } from '../data/mockData.js';

export default function Dashboard() {
  return <><section className="hero"><div><p>Real-time marketplace command center</p><h1>Buy, sell, and manage local tech with confidence.</h1></div><button>Generate report</button></section><section className="stats-grid">{stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section><section className="grid two"><RevenueChart /><CategoryChart /></section><section className="grid two"><ProductTable /><div className="panel"><h3>Live Notifications</h3>{notifications.map((item) => <div className="notice" key={item}>{item}</div>)}<div className="delivery"><strong>Delivery tracking</strong><span>Order #LT-1048 is out for delivery</span><progress value="74" max="100" /></div></div></section></>;
}
