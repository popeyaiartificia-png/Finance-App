import { useState } from 'react';
import { Plus, Send } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useTransactionStore from '../store/transactionStore';
import BalanceCard from '../components/dashboard/BalanceCard';
import TransactionTable from '../components/dashboard/TransactionTable';
import SpendingChart from '../components/dashboard/SpendingChart';
import AddTransactionModal from '../components/dashboard/AddTransactionModal';
import TransferModal from '../components/dashboard/TransferModal';
import Button from '../components/ui/Button';

export default function Dashboard() {
    const { user } = useAuthStore();
    const {
        getUserTransactions,
        getMonthlyIncome,
        getMonthlyExpenses,
        getSpendingByCategory
    } = useTransactionStore();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);

    const transactions = getUserTransactions(user?.id);
    const monthlyIncome = getMonthlyIncome(user?.id);
    const monthlyExpenses = getMonthlyExpenses(user?.id);
    const spendingByCategory = getSpendingByCategory(user?.id);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">
                        Welcome back, {user?.name?.split(' ')[0]}!
                    </h1>
                    <p className="text-gray-400 mt-1">Here's your financial overview</p>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={() => setShowTransferModal(true)}
                    >
                        <Send className="w-4 h-4" />
                        Transfer
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setShowAddModal(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Add Transaction
                    </Button>
                </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                <BalanceCard
                    type="balance"
                    amount={user?.balance || 0}
                    label="Total Balance"
                />
                <BalanceCard
                    type="income"
                    amount={monthlyIncome}
                    label="Monthly Income"
                />
                <BalanceCard
                    type="expense"
                    amount={monthlyExpenses}
                    label="Monthly Expenses"
                />
            </div>

            {/* Charts and Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Spending Chart */}
                <div className="lg:col-span-1">
                    <SpendingChart spendingData={spendingByCategory} />
                </div>

                {/* Transaction History */}
                <div className="lg:col-span-2">
                    <TransactionTable transactions={transactions} />
                </div>
            </div>

            {/* Modals */}
            <AddTransactionModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
            <TransferModal
                isOpen={showTransferModal}
                onClose={() => setShowTransferModal(false)}
            />
        </div>
    );
}
