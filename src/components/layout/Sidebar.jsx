import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    User,
    LogOut,
    Shield,
    Wallet,
    X,
    Menu
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { USER_ROLES } from '../../utils/constants';

export default function Sidebar({ isOpen, onClose }) {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const isAdmin = user?.role === USER_ROLES.ADMIN;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        ...(isAdmin
            ? [{ to: '/admin', icon: Shield, label: 'Admin Panel' }]
            : []),
        { to: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-72 
          bg-slate-900/80 backdrop-blur-xl border-r border-white/5
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* Logo */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">FinanceApp</h1>
                            <p className="text-xs text-gray-500">Personal Banking</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center border border-green-500/30">
                            <span className="text-lg font-bold text-green-400">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{user?.name}</p>
                            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    {isAdmin && (
                        <div className="mt-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                                <Shield className="w-3 h-3" />
                                Admin
                            </span>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="p-4 flex-1">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    onClick={onClose}
                                    className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl font-medium
                    transition-all duration-200
                    ${isActive
                                            ? 'bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400 border border-green-500/30'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }
                  `}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium
              text-gray-400 hover:text-red-400 hover:bg-red-500/10
              transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
