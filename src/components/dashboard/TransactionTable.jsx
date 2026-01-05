import { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, ArrowLeftRight } from 'lucide-react';
import { CATEGORIES, TRANSACTION_TYPES, TRANSACTION_STATUS } from '../../utils/constants';
import GlassCard from '../ui/GlassCard';

export default function TransactionTable({ transactions }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    const filteredTransactions = transactions.filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const getTransactionIcon = (type) => {
        switch (type) {
            case TRANSACTION_TYPES.INCOME:
                return <ArrowDownRight className="w-4 h-4 text-green-400" />;
            case TRANSACTION_TYPES.EXPENSE:
                return <ArrowUpRight className="w-4 h-4 text-red-400" />;
            case TRANSACTION_TYPES.TRANSFER:
                return <ArrowLeftRight className="w-4 h-4 text-blue-400" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            [TRANSACTION_STATUS.COMPLETED]: 'bg-green-500/20 text-green-400 border-green-500/30',
            [TRANSACTION_STATUS.PENDING]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            [TRANSACTION_STATUS.REJECTED]: 'bg-red-500/20 text-red-400 border-red-500/30',
        };
        return styles[status] || styles[TRANSACTION_STATUS.COMPLETED];
    };

    const getCategoryInfo = (categoryId) => {
        return CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[CATEGORIES.length - 1];
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatAmount = (amount, type) => {
        const sign = type === TRANSACTION_TYPES.INCOME ? '+' : '-';
        return `${sign}$${amount.toLocaleString()}`;
    };

    return (
        <GlassCard hover={false}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-white">Recent Transactions</h2>

                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500/50 transition-colors"
                    >
                        <option value="all" className="bg-slate-800">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id} className="bg-slate-800">
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-400 border-b border-white/10">
                            <th className="pb-4 font-medium">Transaction</th>
                            <th className="pb-4 font-medium">Category</th>
                            <th className="pb-4 font-medium">Date</th>
                            <th className="pb-4 font-medium">Status</th>
                            <th className="pb-4 font-medium text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-500">
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            filteredTransactions.map((transaction) => {
                                const category = getCategoryInfo(transaction.category);
                                return (
                                    <tr key={transaction.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                                    {getTransactionIcon(transaction.type)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{transaction.description}</p>
                                                    <p className="text-sm text-gray-500 capitalize">{transaction.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm"
                                                style={{
                                                    backgroundColor: `${category.color}20`,
                                                    color: category.color,
                                                }}
                                            >
                                                {category.name}
                                            </span>
                                        </td>
                                        <td className="py-4 text-gray-400">
                                            {formatDate(transaction.date)}
                                        </td>
                                        <td className="py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusBadge(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                        <td className={`py-4 text-right font-semibold ${transaction.type === TRANSACTION_TYPES.INCOME
                                                ? 'text-green-400'
                                                : 'text-red-400'
                                            }`}>
                                            {formatAmount(transaction.amount, transaction.type)}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile List */}
            <div className="lg:hidden space-y-3">
                {filteredTransactions.length === 0 ? (
                    <p className="py-8 text-center text-gray-500">No transactions found</p>
                ) : (
                    filteredTransactions.map((transaction) => {
                        const category = getCategoryInfo(transaction.category);
                        return (
                            <div
                                key={transaction.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        {getTransactionIcon(transaction.type)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white text-sm">{transaction.description}</p>
                                        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                                    </div>
                                </div>
                                <p className={`font-semibold ${transaction.type === TRANSACTION_TYPES.INCOME
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                    }`}>
                                    {formatAmount(transaction.amount, transaction.type)}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </GlassCard>
    );
}
