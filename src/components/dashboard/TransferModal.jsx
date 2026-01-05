import { useState } from 'react';
import { Send } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { TRANSACTION_TYPES } from '../../utils/constants';
import useTransactionStore from '../../store/transactionStore';
import useAuthStore from '../../store/authStore';

export default function TransferModal({ isOpen, onClose }) {
    const { addTransaction } = useTransactionStore();
    const { user, users, updateBalance } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        recipientEmail: '',
        amount: '',
        description: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const amount = parseFloat(formData.amount);

        // Check if user has enough balance
        if (amount > user.balance) {
            setError('Insufficient funds');
            setIsLoading(false);
            return;
        }

        // Find recipient
        const recipient = users.find(
            (u) => u.email === formData.recipientEmail && u.id !== user.id
        );

        if (!recipient) {
            setError('Recipient not found');
            setIsLoading(false);
            return;
        }

        // Create transfer transaction (pending approval)
        addTransaction({
            userId: user.id,
            type: TRANSACTION_TYPES.TRANSFER,
            category: 'transfer',
            amount,
            description: `Transfer to ${recipient.name}: ${formData.description || 'No description'}`,
            recipientId: recipient.id,
        });

        setIsLoading(false);
        setFormData({
            recipientEmail: '',
            amount: '',
            description: '',
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Transfer Funds">
            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <p className="text-sm text-gray-400">Available Balance</p>
                    <p className="text-2xl font-bold text-emerald-400">
                        ${user?.balance?.toLocaleString() || 0}
                    </p>
                </div>

                <Input
                    label="Recipient Email"
                    name="recipientEmail"
                    type="email"
                    placeholder="recipient@example.com"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    required
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
                    max={user?.balance || 0}
                />

                <Input
                    label="Description (Optional)"
                    name="description"
                    type="text"
                    placeholder="What's this for?"
                    value={formData.description}
                    onChange={handleChange}
                />

                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                    <p className="text-sm text-yellow-400">
                        ⚠️ Transfers require admin approval before processing
                    </p>
                </div>

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
                        <Send className="w-4 h-4" />
                        Send Transfer
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
