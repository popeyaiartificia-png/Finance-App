// Transaction Categories
export const CATEGORIES = [
    { id: 'salary', name: 'Salary', icon: 'Briefcase', color: '#10b981' },
    { id: 'food', name: 'Food & Dining', icon: 'UtensilsCrossed', color: '#f59e0b' },
    { id: 'rent', name: 'Rent', icon: 'Home', color: '#6366f1' },
    { id: 'utilities', name: 'Utilities', icon: 'Zap', color: '#8b5cf6' },
    { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag', color: '#ec4899' },
    { id: 'entertainment', name: 'Entertainment', icon: 'Gamepad2', color: '#14b8a6' },
    { id: 'healthcare', name: 'Healthcare', icon: 'Heart', color: '#ef4444' },
    { id: 'travel', name: 'Travel', icon: 'Plane', color: '#0ea5e9' },
    { id: 'education', name: 'Education', icon: 'GraduationCap', color: '#f97316' },
    { id: 'transfer', name: 'Transfer', icon: 'ArrowLeftRight', color: '#64748b' },
    { id: 'other', name: 'Other', icon: 'MoreHorizontal', color: '#94a3b8' },
];

// Transaction Types
export const TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense',
    TRANSFER: 'transfer',
};

// User Roles
export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
};

// Account Status
export const ACCOUNT_STATUS = {
    ACTIVE: 'active',
    FROZEN: 'frozen',
    PENDING: 'pending',
};

// Transaction Status
export const TRANSACTION_STATUS = {
    COMPLETED: 'completed',
    PENDING: 'pending',
    REJECTED: 'rejected',
};

// Demo Users
export const DEMO_USERS = [
    {
        id: '1',
        email: 'admin@financeapp.com',
        password: 'admin123',
        name: 'Admin User',
        role: USER_ROLES.ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
        balance: 50000,
        createdAt: new Date('2024-01-01').toISOString(),
    },
    {
        id: '2',
        email: 'user@financeapp.com',
        password: 'user123',
        name: 'John Doe',
        role: USER_ROLES.USER,
        status: ACCOUNT_STATUS.ACTIVE,
        balance: 12500,
        createdAt: new Date('2024-03-15').toISOString(),
    },
    {
        id: '3',
        email: 'jane@financeapp.com',
        password: 'jane123',
        name: 'Jane Smith',
        role: USER_ROLES.USER,
        status: ACCOUNT_STATUS.ACTIVE,
        balance: 8750,
        createdAt: new Date('2024-06-20').toISOString(),
    },
];

// Demo Transactions
export const DEMO_TRANSACTIONS = [
    {
        id: 't1',
        userId: '2',
        type: TRANSACTION_TYPES.INCOME,
        category: 'salary',
        amount: 5000,
        description: 'Monthly Salary',
        date: new Date('2025-12-01').toISOString(),
        status: TRANSACTION_STATUS.COMPLETED,
    },
    {
        id: 't2',
        userId: '2',
        type: TRANSACTION_TYPES.EXPENSE,
        category: 'rent',
        amount: 1200,
        description: 'Apartment Rent',
        date: new Date('2025-12-02').toISOString(),
        status: TRANSACTION_STATUS.COMPLETED,
    },
    {
        id: 't3',
        userId: '2',
        type: TRANSACTION_TYPES.EXPENSE,
        category: 'food',
        amount: 250,
        description: 'Grocery Shopping',
        date: new Date('2025-12-05').toISOString(),
        status: TRANSACTION_STATUS.COMPLETED,
    },
    {
        id: 't4',
        userId: '2',
        type: TRANSACTION_TYPES.EXPENSE,
        category: 'utilities',
        amount: 150,
        description: 'Electricity Bill',
        date: new Date('2025-12-08').toISOString(),
        status: TRANSACTION_STATUS.COMPLETED,
    },
    {
        id: 't5',
        userId: '2',
        type: TRANSACTION_TYPES.EXPENSE,
        category: 'entertainment',
        amount: 80,
        description: 'Netflix & Spotify',
        date: new Date('2025-12-10').toISOString(),
        status: TRANSACTION_STATUS.COMPLETED,
    },
    {
        id: 't6',
        userId: '2',
        type: TRANSACTION_TYPES.EXPENSE,
        category: 'shopping',
        amount: 350,
        description: 'Winter Clothing',
        date: new Date('2025-12-15').toISOString(),
        status: TRANSACTION_STATUS.COMPLETED,
    },
    {
        id: 't7',
        userId: '2',
        type: TRANSACTION_TYPES.TRANSFER,
        category: 'transfer',
        amount: 500,
        description: 'Transfer to Savings',
        date: new Date('2025-12-20').toISOString(),
        status: TRANSACTION_STATUS.PENDING,
    },
    {
        id: 't8',
        userId: '3',
        type: TRANSACTION_TYPES.INCOME,
        category: 'salary',
        amount: 4500,
        description: 'Monthly Salary',
        date: new Date('2025-12-01').toISOString(),
        status: TRANSACTION_STATUS.COMPLETED,
    },
    {
        id: 't9',
        userId: '3',
        type: TRANSACTION_TYPES.EXPENSE,
        category: 'healthcare',
        amount: 200,
        description: 'Doctor Visit',
        date: new Date('2025-12-12').toISOString(),
        status: TRANSACTION_STATUS.COMPLETED,
    },
];

// Chart Colors
export const CHART_COLORS = [
    '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#14b8a6',
    '#ef4444', '#8b5cf6', '#0ea5e9', '#f97316', '#64748b',
];
