import { Check, X, ArrowLeftRight, Clock } from 'lucide-react';
import { TRANSACTION_STATUS } from '../../utils/constants';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

export default function TransactionApproval({ transactions, users, onApprove, onReject }) {
    const pendingTransactions = transactions.filter(
        (t) => t.status === TRANSACTION_STATUS.PENDING
    );

    const getUserName = (userId) => {
        const user = users.find((u) => u.id === userId);
        return user?.name || 'Unknown User';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Pending Approvals</h2>
                        <p className="text-sm text-gray-400">{pendingTransactions.length} transactions awaiting review</p>
                    </div>
                </div>
            </div>

            {pendingTransactions.length === 0 ? (
                <div className="py-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Check className="w-8 h-8 text-emerald-400" />
                    </div>
                    <p className="text-gray-400">No pending transactions</p>
                    <p className="text-sm text-gray-500 mt-1">All transactions have been reviewed</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {pendingTransactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/30 transition-colors"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
                                        <ArrowLeftRight className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{transaction.description}</p>
                                        <p className="text-sm text-gray-400">
                                            From: <span className="text-white">{getUserName(transaction.userId)}</span>
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatDate(transaction.date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-white">
                                            ${transaction.amount.toLocaleString()}
                                        </p>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                                            <Clock className="w-3 h-3" />
                                            Pending
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => onApprove(transaction.id)}
                                        >
                                            <Check className="w-4 h-4" />
                                            <span className="hidden sm:inline">Approve</span>
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => onReject(transaction.id)}
                                        >
                                            <X className="w-4 h-4" />
                                            <span className="hidden sm:inline">Reject</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </GlassCard>
    );
}
