import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Shield, Wallet } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { USER_ROLES } from '../../utils/constants';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: USER_ROLES.USER,
    });

    const { login, signup, error, isLoading, clearError } = useAuthStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) clearError();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let success;
        if (isLogin) {
            success = login(formData.email, formData.password);
        } else {
            success = signup(formData.name, formData.email, formData.password, formData.role);
        }

        if (success) {
            navigate('/dashboard');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '', role: USER_ROLES.USER });
        if (error) clearError();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background orbs */}
            <div className="bg-orb bg-orb-1" />
            <div className="bg-orb bg-orb-2" />
            <div className="bg-orb bg-orb-3" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4 shadow-lg shadow-green-500/25">
                        <Wallet className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">FinanceApp</h1>
                    <p className="text-gray-400 mt-2">Personal Banking Solution</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    {/* Toggle */}
                    <div className="flex bg-white/5 rounded-xl p-1 mb-8">
                        <button
                            onClick={() => isLogin || toggleMode()}
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${isLogin
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => !isLogin || toggleMode()}
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${!isLogin
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <Input
                                label="Full Name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                icon={User}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        )}

                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Account Type
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: USER_ROLES.USER })}
                                        className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${formData.role === USER_ROLES.USER
                                                ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                            }`}
                                    >
                                        <User className="w-6 h-6" />
                                        <span className="text-sm font-medium">User</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: USER_ROLES.ADMIN })}
                                        className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${formData.role === USER_ROLES.ADMIN
                                                ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                            }`}
                                    >
                                        <Shield className="w-6 h-6" />
                                        <span className="text-sm font-medium">Admin</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </Button>
                    </form>

                    {/* Demo credentials */}
                    <div className="mt-8 p-4 rounded-xl bg-slate-800/50 border border-white/5">
                        <p className="text-xs text-gray-500 font-medium mb-2">Demo Credentials:</p>
                        <div className="space-y-1 text-xs text-gray-400">
                            <p><span className="text-green-400">Admin:</span> admin@financeapp.com / admin123</p>
                            <p><span className="text-green-400">User:</span> user@financeapp.com / user123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
