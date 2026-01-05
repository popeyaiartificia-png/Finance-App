import { useState } from 'react';
import { User, Mail, Shield, Calendar, Wallet, Save } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { USER_ROLES } from '../utils/constants';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Profile() {
    const { user } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // In a real app, this would update the user profile
        setIsEditing(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">Profile</h1>
                <p className="text-gray-400 mt-1">Manage your account settings</p>
            </div>

            {/* Profile Card */}
            <GlassCard hover={false}>
                {/* Avatar Section */}
                <div className="flex flex-col items-center pb-6 border-b border-white/10">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/25">
                        <span className="text-4xl font-bold text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                    <p className="text-gray-400">{user?.email}</p>
                    {user?.role === USER_ROLES.ADMIN && (
                        <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                            <Shield className="w-4 h-4" />
                            Administrator
                        </span>
                    )}
                </div>

                {/* Account Info */}
                <div className="py-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <Wallet className="w-5 h-5 text-green-400" />
                                <span className="text-sm text-gray-400">Account Balance</span>
                            </div>
                            <p className="text-2xl font-bold text-green-400">
                                ${user?.balance?.toLocaleString() || 0}
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar className="w-5 h-5 text-blue-400" />
                                <span className="text-sm text-gray-400">Member Since</span>
                            </div>
                            <p className="text-lg font-semibold text-white">
                                {formatDate(user?.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Edit Profile */}
                <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Profile Details</h3>
                        {!isEditing && (
                            <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </Button>
                        )}
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            name="name"
                            icon={User}
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            icon={Mail}
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />

                        {isEditing && (
                            <div className="flex gap-3 pt-4">
                                <Button
                                    variant="ghost"
                                    className="flex-1"
                                    onClick={() => {
                                        setFormData({ name: user?.name || '', email: user?.email || '' });
                                        setIsEditing(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    className="flex-1"
                                    onClick={handleSave}
                                >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </GlassCard>

            {/* Account ID */}
            <GlassCard hover={false} className="text-center">
                <p className="text-sm text-gray-500">Account ID</p>
                <p className="text-sm text-gray-400 font-mono mt-1">{user?.id}</p>
            </GlassCard>
        </div>
    );
}
