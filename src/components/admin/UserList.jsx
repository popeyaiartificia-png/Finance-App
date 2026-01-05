import { Lock, Unlock, User, Shield } from 'lucide-react';
import { ACCOUNT_STATUS, USER_ROLES } from '../../utils/constants';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

export default function UserList({ users, onToggleFreeze }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Filter out current admin from the list (optional)
    const displayUsers = users.filter(u => u.role !== USER_ROLES.ADMIN);

    return (
        <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">User Management</h2>
                <span className="text-sm text-gray-400">{displayUsers.length} users</span>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-sm text-gray-400 border-b border-white/10">
                            <th className="pb-4 font-medium">User</th>
                            <th className="pb-4 font-medium">Email</th>
                            <th className="pb-4 font-medium">Balance</th>
                            <th className="pb-4 font-medium">Joined</th>
                            <th className="pb-4 font-medium">Status</th>
                            <th className="pb-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayUsers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            displayUsers.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center border border-green-500/30">
                                                <span className="text-sm font-bold text-green-400">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{user.name}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    {user.role === USER_ROLES.ADMIN ? (
                                                        <>
                                                            <Shield className="w-3 h-3" />
                                                            Admin
                                                        </>
                                                    ) : (
                                                        <>
                                                            <User className="w-3 h-3" />
                                                            User
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-gray-400">{user.email}</td>
                                    <td className="py-4">
                                        <span className="text-green-400 font-semibold">
                                            ${user.balance?.toLocaleString() || 0}
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-400">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td className="py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${user.status === ACCOUNT_STATUS.FROZEN
                                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                                            }`}>
                                            {user.status === ACCOUNT_STATUS.FROZEN ? 'Frozen' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <Button
                                            variant={user.status === ACCOUNT_STATUS.FROZEN ? 'secondary' : 'danger'}
                                            size="sm"
                                            onClick={() => onToggleFreeze(user.id)}
                                        >
                                            {user.status === ACCOUNT_STATUS.FROZEN ? (
                                                <>
                                                    <Unlock className="w-4 h-4" />
                                                    Unfreeze
                                                </>
                                            ) : (
                                                <>
                                                    <Lock className="w-4 h-4" />
                                                    Freeze
                                                </>
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile List */}
            <div className="lg:hidden space-y-4">
                {displayUsers.length === 0 ? (
                    <p className="py-8 text-center text-gray-500">No users found</p>
                ) : (
                    displayUsers.map((user) => (
                        <div
                            key={user.id}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center border border-green-500/30">
                                        <span className="text-sm font-bold text-green-400">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{user.name}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${user.status === ACCOUNT_STATUS.FROZEN
                                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                        : 'bg-green-500/20 text-green-400 border-green-500/30'
                                    }`}>
                                    {user.status === ACCOUNT_STATUS.FROZEN ? 'Frozen' : 'Active'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-400">
                                        Balance: <span className="text-green-400 font-semibold">${user.balance?.toLocaleString() || 0}</span>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Joined {formatDate(user.createdAt)}
                                    </p>
                                </div>
                                <Button
                                    variant={user.status === ACCOUNT_STATUS.FROZEN ? 'secondary' : 'danger'}
                                    size="sm"
                                    onClick={() => onToggleFreeze(user.id)}
                                >
                                    {user.status === ACCOUNT_STATUS.FROZEN ? 'Unfreeze' : 'Freeze'}
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </GlassCard>
    );
}
