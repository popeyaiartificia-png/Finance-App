import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useTransactionStore from '../store/transactionStore';
import { USER_ROLES } from '../utils/constants';
import SystemAnalytics from '../components/admin/SystemAnalytics';
import UserList from '../components/admin/UserList';
import TransactionApproval from '../components/admin/TransactionApproval';

export default function Admin() {
    const { user, users, toggleUserFreeze } = useAuthStore();
    const { transactions, approveTransaction, rejectTransaction } = useTransactionStore();

    // Redirect non-admins
    if (user?.role !== USER_ROLES.ADMIN) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">Admin Panel</h1>
                <p className="text-gray-400 mt-1">Manage users and monitor system activity</p>
            </div>

            {/* System Analytics */}
            <SystemAnalytics users={users} transactions={transactions} />

            {/* Transaction Approvals */}
            <TransactionApproval
                transactions={transactions}
                users={users}
                onApprove={approveTransaction}
                onReject={rejectTransaction}
            />

            {/* User Management */}
            <UserList
                users={users}
                onToggleFreeze={toggleUserFreeze}
            />
        </div>
    );
}
