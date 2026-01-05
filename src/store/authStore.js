import { create } from 'zustand';
import {
    saveAuth,
    loadAuth,
    clearAuth,
    saveUsers,
    loadUsers
} from '../utils/localStorage';
import { DEMO_USERS, USER_ROLES, ACCOUNT_STATUS } from '../utils/constants';

// Initialize users in localStorage if not present
const initializeUsers = () => {
    const existingUsers = loadUsers();
    if (!existingUsers || existingUsers.length === 0) {
        saveUsers(DEMO_USERS);
        return DEMO_USERS;
    }
    return existingUsers;
};

const useAuthStore = create((set, get) => ({
    user: loadAuth(),
    users: initializeUsers(),
    isAuthenticated: !!loadAuth(),
    isLoading: false,
    error: null,

    // Login action
    login: (email, password) => {
        set({ isLoading: true, error: null });

        const users = get().users;
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            set({ isLoading: false, error: 'Invalid email or password' });
            return false;
        }

        if (user.status === ACCOUNT_STATUS.FROZEN) {
            set({ isLoading: false, error: 'Your account has been frozen. Contact admin.' });
            return false;
        }

        const { password: _, ...userWithoutPassword } = user;
        saveAuth(userWithoutPassword);
        set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
            error: null
        });
        return true;
    },

    // Signup action
    signup: (name, email, password, role = USER_ROLES.USER) => {
        set({ isLoading: true, error: null });

        const users = get().users;
        const existingUser = users.find((u) => u.email === email);

        if (existingUser) {
            set({ isLoading: false, error: 'Email already registered' });
            return false;
        }

        const newUser = {
            id: `user_${Date.now()}`,
            name,
            email,
            password,
            role,
            status: ACCOUNT_STATUS.ACTIVE,
            balance: 0,
            createdAt: new Date().toISOString(),
        };

        const updatedUsers = [...users, newUser];
        saveUsers(updatedUsers);

        const { password: _, ...userWithoutPassword } = newUser;
        saveAuth(userWithoutPassword);

        set({
            users: updatedUsers,
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
            error: null
        });
        return true;
    },

    // Logout action
    logout: () => {
        clearAuth();
        set({ user: null, isAuthenticated: false, error: null });
    },

    // Update user balance
    updateBalance: (userId, amount) => {
        const users = get().users;
        const updatedUsers = users.map((u) =>
            u.id === userId ? { ...u, balance: u.balance + amount } : u
        );
        saveUsers(updatedUsers);

        const currentUser = get().user;
        if (currentUser?.id === userId) {
            const updatedUser = { ...currentUser, balance: currentUser.balance + amount };
            saveAuth(updatedUser);
            set({ users: updatedUsers, user: updatedUser });
        } else {
            set({ users: updatedUsers });
        }
    },

    // Toggle user freeze status (Admin only)
    toggleUserFreeze: (userId) => {
        const users = get().users;
        const updatedUsers = users.map((u) =>
            u.id === userId
                ? {
                    ...u,
                    status:
                        u.status === ACCOUNT_STATUS.FROZEN
                            ? ACCOUNT_STATUS.ACTIVE
                            : ACCOUNT_STATUS.FROZEN,
                }
                : u
        );
        saveUsers(updatedUsers);
        set({ users: updatedUsers });
    },

    // Clear error
    clearError: () => set({ error: null }),

    // Refresh users from storage
    refreshUsers: () => {
        const users = loadUsers() || DEMO_USERS;
        set({ users });
    },
}));

export default useAuthStore;
