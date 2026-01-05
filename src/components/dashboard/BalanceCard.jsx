import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function BalanceCard({ type, amount, label, trend }) {
    const getIcon = () => {
        switch (type) {
            case 'balance':
                return Wallet;
            case 'income':
                return TrendingUp;
            case 'expense':
                return TrendingDown;
            default:
                return Wallet;
        }
    };

    const getColor = () => {
        switch (type) {
            case 'balance':
                return {
                    bg: 'from-green-500/20 to-green-600/10',
                    border: 'border-green-500/30',
                    text: 'text-green-400',
                    icon: 'from-green-400 to-green-600',
                };
            case 'income':
                return {
                    bg: 'from-green-500/20 to-green-600/10',
                    border: 'border-green-500/30',
                    text: 'text-green-400',
                    icon: 'from-green-400 to-green-600',
                };
            case 'expense':
                return {
                    bg: 'from-red-500/20 to-red-600/10',
                    border: 'border-red-500/30',
                    text: 'text-red-400',
                    icon: 'from-red-400 to-red-600',
                };
            default:
                return {
                    bg: 'from-gray-500/20 to-gray-600/10',
                    border: 'border-gray-500/30',
                    text: 'text-gray-400',
                    icon: 'from-gray-400 to-gray-600',
                };
        }
    };

    const Icon = getIcon();
    const colors = getColor();

    const formatAmount = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <GlassCard className={`bg-gradient-to-br ${colors.bg} ${colors.border}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-400 mb-1">{label}</p>
                    <p className={`text-3xl font-bold ${colors.text}`}>
                        {formatAmount(amount)}
                    </p>
                    {trend !== undefined && (
                        <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {trend >= 0 ? '+' : ''}{trend}% from last month
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.icon} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </GlassCard>
    );
}
