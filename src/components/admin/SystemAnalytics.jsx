import { Users, Wallet, ArrowUpRight, Clock } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function SystemAnalytics({ users, transactions }) {
    // Calculate total liquidity
    const totalLiquidity = users.reduce((sum, user) => sum + (user.balance || 0), 0);

    // Calculate total users
    const totalUsers = users.filter(u => u.role === 'user').length;

    // Calculate pending transactions
    const pendingTransactions = transactions.filter(t => t.status === 'pending').length;

    // Calculate total transaction volume
    const totalVolume = transactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const stats = [
        {
            label: 'Total Liquidity',
            value: `$${totalLiquidity.toLocaleString()}`,
            icon: Wallet,
            gradient: 'from-green-500/20 to-green-600/10',
            border: 'border-green-500/30',
            iconGradient: 'from-green-400 to-green-600',
        },
        {
            label: 'Total Users',
            value: totalUsers,
            icon: Users,
            gradient: 'from-blue-500/20 to-blue-600/10',
            border: 'border-blue-500/30',
            iconGradient: 'from-blue-400 to-blue-600',
        },
        {
            label: 'Transaction Volume',
            value: `$${totalVolume.toLocaleString()}`,
            icon: ArrowUpRight,
            gradient: 'from-green-500/20 to-green-600/10',
            border: 'border-green-500/30',
            iconGradient: 'from-green-400 to-green-600',
        },
        {
            label: 'Pending Approvals',
            value: pendingTransactions,
            icon: Clock,
            gradient: 'from-red-500/20 to-red-600/10',
            border: 'border-red-500/30',
            iconGradient: 'from-red-400 to-red-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <GlassCard
                    key={stat.label}
                    className={`bg-gradient-to-br ${stat.gradient} ${stat.border}`}
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.iconGradient} flex items-center justify-center shadow-lg`}>
                            <stat.icon className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
}
