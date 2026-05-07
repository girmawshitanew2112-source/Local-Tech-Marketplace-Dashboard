export default function StatCard({ stat }) {
  return <article className={`stat ${stat.tone}`}><span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.trend} this month</small></article>;
}
