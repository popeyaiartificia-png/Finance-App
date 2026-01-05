const STORAGE_KEYS = {
    AUTH: 'finance_auth',
    USERS: 'finance_users',
    TRANSACTIONS: 'finance_transactions',
};

// Load data from localStorage
export const loadFromStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return null;
    }
};

// Save data to localStorage
export const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
        return false;
    }
};

// Remove data from localStorage
export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`Error removing ${key} from localStorage:`, error);
        return false;
    }
};

// Auth helpers
export const saveAuth = (user) => saveToStorage(STORAGE_KEYS.AUTH, user);
export const loadAuth = () => loadFromStorage(STORAGE_KEYS.AUTH);
export const clearAuth = () => removeFromStorage(STORAGE_KEYS.AUTH);

// Users helpers
export const saveUsers = (users) => saveToStorage(STORAGE_KEYS.USERS, users);
export const loadUsers = () => loadFromStorage(STORAGE_KEYS.USERS);

// Transactions helpers
export const saveTransactions = (transactions) =>
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
export const loadTransactions = () => loadFromStorage(STORAGE_KEYS.TRANSACTIONS);

export { STORAGE_KEYS };
