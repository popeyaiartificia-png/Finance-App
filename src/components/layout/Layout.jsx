import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import useAuthStore from '../../store/authStore';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuthStore();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background orbs */}
            <div className="bg-orb bg-orb-1" />
            <div className="bg-orb bg-orb-2" />
            <div className="bg-orb bg-orb-3" />

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main content */}
            <div className="lg:ml-72 min-h-screen relative z-10">
                {/* Top navbar */}
                <header className="sticky top-0 z-30 bg-slate-900/50 backdrop-blur-xl border-b border-white/5">
                    <div className="flex items-center justify-between px-4 lg:px-8 h-16">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <Menu className="w-6 h-6 text-gray-400" />
                        </button>

                        {/* Page title - shows on mobile */}
                        <h1 className="lg:hidden text-lg font-semibold text-white">FinanceApp</h1>

                        {/* Spacer for desktop */}
                        <div className="hidden lg:block" />

                        {/* Right side */}
                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                                <Bell className="w-5 h-5 text-gray-400" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
                            </button>

                            {/* User avatar - mobile only */}
                            <div className="lg:hidden w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center border border-green-500/30">
                                <span className="text-sm font-bold text-green-400">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
