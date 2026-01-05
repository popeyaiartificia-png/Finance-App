import { create } from 'zustand';
import { saveTransactions, loadTransactions } from '../utils/localStorage';
import {
    DEMO_TRANSACTIONS,
    TRANSACTION_STATUS,
    TRANSACTION_TYPES
} from '../utils/constants';

// Initialize transactions in localStorage if not present
const initializeTransactions = () => {
    const existingTransactions = loadTransactions();
    if (!existingTransactions || existingTransactions.length === 0) {
        saveTransactions(DEMO_TRANSACTIONS);
        return DEMO_TRANSACTIONS;
    }
    return existingTransactions;
};

const useTransactionStore = create((set, get) => ({
    transactions: initializeTransactions(),
    isLoading: false,

    // Add a new transaction
    addTransaction: (transaction) => {
        const newTransaction = {
            id: `t_${Date.now()}`,
            ...transaction,
            date: new Date().toISOString(),
            status: transaction.type === TRANSACTION_TYPES.TRANSFER
                ? TRANSACTION_STATUS.PENDING
                : TRANSACTION_STATUS.COMPLETED,
        };

        const transactions = get().transactions;
        const updatedTransactions = [newTransaction, ...transactions];
        saveTransactions(updatedTransactions);
        set({ transactions: updatedTransactions });

        return newTransaction;
    },

    // Get transactions for a specific user
    getUserTransactions: (userId) => {
        return get().transactions.filter((t) => t.userId === userId);
    },

    // Get all pending transactions (Admin)
    getPendingTransactions: () => {
        return get().transactions.filter(
            (t) => t.status === TRANSACTION_STATUS.PENDING
        );
    },

    // Approve transaction (Admin)
    approveTransaction: (transactionId) => {
        const transactions = get().transactions;
        const updatedTransactions = transactions.map((t) =>
            t.id === transactionId
                ? { ...t, status: TRANSACTION_STATUS.COMPLETED }
                : t
        );
        saveTransactions(updatedTransactions);
        set({ transactions: updatedTransactions });
    },

    // Reject transaction (Admin)
    rejectTransaction: (transactionId) => {
        const transactions = get().transactions;
        const updatedTransactions = transactions.map((t) =>
            t.id === transactionId
                ? { ...t, status: TRANSACTION_STATUS.REJECTED }
                : t
        );
        saveTransactions(updatedTransactions);
        set({ transactions: updatedTransactions });
    },

    // Calculate monthly income for a user
    getMonthlyIncome: (userId) => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return get().transactions
            .filter(
                (t) =>
                    t.userId === userId &&
                    t.type === TRANSACTION_TYPES.INCOME &&
                    t.status === TRANSACTION_STATUS.COMPLETED &&
                    new Date(t.date) >= startOfMonth
            )
            .reduce((sum, t) => sum + t.amount, 0);
    },

    // Calculate monthly expenses for a user
    getMonthlyExpenses: (userId) => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return get().transactions
            .filter(
                (t) =>
                    t.userId === userId &&
                    t.type === TRANSACTION_TYPES.EXPENSE &&
                    t.status === TRANSACTION_STATUS.COMPLETED &&
                    new Date(t.date) >= startOfMonth
            )
            .reduce((sum, t) => sum + t.amount, 0);
    },

    // Get spending by category for a user
    getSpendingByCategory: (userId) => {
        const transactions = get().transactions.filter(
            (t) =>
                t.userId === userId &&
                t.type === TRANSACTION_TYPES.EXPENSE &&
                t.status === TRANSACTION_STATUS.COMPLETED
        );

        const categoryMap = {};
        transactions.forEach((t) => {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });

        return Object.entries(categoryMap).map(([category, amount]) => ({
            category,
            amount,
        }));
    },

    // Get total system liquidity (Admin)
    getTotalLiquidity: () => {
        // This would normally aggregate all user balances
        // For now, we return a placeholder
        return get().transactions
            .filter((t) => t.status === TRANSACTION_STATUS.COMPLETED)
            .reduce((sum, t) => {
                if (t.type === TRANSACTION_TYPES.INCOME) return sum + t.amount;
                if (t.type === TRANSACTION_TYPES.EXPENSE) return sum - t.amount;
                return sum;
            }, 0);
    },

    // Refresh transactions from storage
    refreshTransactions: () => {
        const transactions = loadTransactions() || DEMO_TRANSACTIONS;
        set({ transactions });
    },
}));

export default useTransactionStore;
