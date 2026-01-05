import { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { CATEGORIES, TRANSACTION_TYPES } from '../../utils/constants';
import useTransactionStore from '../../store/transactionStore';
import useAuthStore from '../../store/authStore';

export default function AddTransactionModal({ isOpen, onClose }) {
    const { addTransaction } = useTransactionStore();
    const { user, updateBalance } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: TRANSACTION_TYPES.EXPENSE,
        category: 'food',
        amount: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const amount = parseFloat(formData.amount);
        const transaction = {
            userId: user.id,
            type: formData.type,
            category: formData.category,
            amount,
            description: formData.description,
        };

        addTransaction(transaction);

        // Update user balance
        if (formData.type === TRANSACTION_TYPES.INCOME) {
            updateBalance(user.id, amount);
        } else if (formData.type === TRANSACTION_TYPES.EXPENSE) {
            updateBalance(user.id, -amount);
        }

        setIsLoading(false);
        setFormData({
            type: TRANSACTION_TYPES.EXPENSE,
            category: 'food',
            amount: '',
            description: '',
        });
        onClose();
    };

    const typeOptions = [
        { value: TRANSACTION_TYPES.INCOME, label: 'Income' },
        { value: TRANSACTION_TYPES.EXPENSE, label: 'Expense' },
    ];

    const categoryOptions = CATEGORIES.filter(c => c.id !== 'transfer').map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
            <form onSubmit={handleSubmit} className="space-y-5">
                <Select
                    label="Transaction Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    options={typeOptions}
                />

                <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={categoryOptions}
                />

                <Input
                    label="Amount"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                />

                <Input
                    label="Description"
                    name="description"
                    type="text"
                    placeholder="Enter description..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <div className="flex gap-3 pt-4">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="flex-1"
                        disabled={isLoading}
                    >
                        <Plus className="w-4 h-4" />
                        Add Transaction
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
