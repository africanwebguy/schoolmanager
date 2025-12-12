interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'purple';
}

export default function StatsCard({ title, value, icon, trend, color = 'green' }: StatsCardProps) {
  const colorClasses = {
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-cyan-600',
    yellow: 'from-yellow-500 to-orange-600',
    red: 'from-red-500 to-pink-600',
    purple: 'from-purple-500 to-indigo-600',
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{value}</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
    </div>
  );
}
