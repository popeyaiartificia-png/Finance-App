import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';
import { CATEGORIES, CHART_COLORS } from '../../utils/constants';
import GlassCard from '../ui/GlassCard';

export default function SpendingChart({ spendingData }) {
    // Prepare data for the chart
    const chartData = spendingData.map((item) => {
        const category = CATEGORIES.find((c) => c.id === item.category);
        return {
            name: category?.name || item.category,
            value: item.amount,
            color: category?.color || '#94a3b8',
        };
    });

    // Sort by amount descending
    chartData.sort((a, b) => b.value - a.value);

    const totalSpending = chartData.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const percentage = ((data.value / totalSpending) * 100).toFixed(1);
            return (
                <div className="bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 shadow-xl">
                    <p className="text-white font-medium">{data.name}</p>
                    <p className="text-emerald-400 font-bold">${data.value.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">{percentage}% of total</p>
                </div>
            );
        }
        return null;
    };

    const CustomLegend = ({ payload }) => {
        return (
            <div className="grid grid-cols-2 gap-2 mt-4">
                {payload.slice(0, 6).map((entry, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-gray-400 truncate">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    if (chartData.length === 0) {
        return (
            <GlassCard hover={false}>
                <h2 className="text-xl font-bold text-white mb-4">Spending Breakdown</h2>
                <div className="h-64 flex items-center justify-center text-gray-500">
                    No spending data available
                </div>
            </GlassCard>
        );
    }

    return (
        <GlassCard hover={false}>
            <h2 className="text-xl font-bold text-white mb-4">Spending Breakdown</h2>

            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    stroke="rgba(0,0,0,0.2)"
                                    strokeWidth={2}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Total */}
            <div className="text-center mt-2 mb-4">
                <p className="text-gray-400 text-sm">Total Spending</p>
                <p className="text-2xl font-bold text-white">${totalSpending.toLocaleString()}</p>
            </div>

            {/* Legend */}
            <CustomLegend payload={chartData.map(item => ({ value: item.name, color: item.color }))} />
        </GlassCard>
    );
}
