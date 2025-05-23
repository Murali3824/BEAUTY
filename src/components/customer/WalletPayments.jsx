import { useState } from 'react';
import { Wallet, CreditCard, Plus } from 'lucide-react';

const WalletPayments = () => {
    const [walletBalance, setWalletBalance] = useState(
        JSON.parse(localStorage.getItem('wallet'))?.balance || 50.00
    );
    const [paymentMethods, setPaymentMethods] = useState(
        JSON.parse(localStorage.getItem('paymentMethods')) || [
            { id: 1, type: 'Credit Card', lastFour: '1234', expiry: '12/26' },
            { id: 2, type: 'PayPal', email: 'user@example.com' },
        ]
    );
    const [newFunds, setNewFunds] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddFunds = () => {
        if (!newFunds || isNaN(newFunds) || newFunds <= 0) {
            setError('Please enter a valid amount');
            return;
        }
        const updatedBalance = walletBalance + parseFloat(newFunds);
        setWalletBalance(updatedBalance);
        localStorage.setItem('wallet', JSON.stringify({ balance: updatedBalance }));
        setSuccess(`Added $${newFunds} to your wallet!`);
        setError('');
        setNewFunds('');
    };

    const handleAddPaymentMethod = () => {
        const newMethod = {
            id: paymentMethods.length + 1,
            type: 'Credit Card',
            lastFour: '5678',
            expiry: '01/28',
        };
        const updatedMethods = [...paymentMethods, newMethod];
        setPaymentMethods(updatedMethods);
        localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
        setSuccess('New payment method added!');
        setError('');
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-playfair font-medium text-gray-800 mb-6">Wallet & Payments</h1>
            {/* Wallet Balance */}
            <div className="mb-8">
                <h2 className="text-xl font-playfair font-medium text-gray-800 mb-4">Wallet Balance</h2>
                <div className="flex items-center justify-between border border-fuchsia-300/20 rounded-lg p-4">
                    <div className="flex items-center">
                        <Wallet className="h-8 w-8 text-yellow-500 mr-4" />
                        <div>
                            <p className="font-lato font-medium text-gray-800">Available Balance</p>
                            <p className="text-2xl font-bold text-yellow-500">${walletBalance.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <input
                        type="number"
                        value={newFunds}
                        onChange={(e) => {
                            setNewFunds(e.target.value);
                            setError('');
                            setSuccess('');
                        }}
                        className="w-32 px-4 py-2 border border-fuchsia-300/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 font-lato"
                        placeholder="Amount"
                    />
                    <button
                        onClick={handleAddFunds}
                        className="bg-fuchsia-500 text-white font-lato font-medium py-2 px-4 rounded-lg hover:bg-fuchsia-600 transition-all duration-300"
                    >
                        Add Funds
                    </button>
                </div>
            </div>

            {/* Payment Methods */}
            <div>
                <h2 className="text-xl font-playfair font-medium text-gray-800 mb-4">Payment Methods</h2>
                <div className="space-y-4">
                    {paymentMethods.map((method) => (
                        <div
                            key={method.id}
                            className="flex items-center justify-between border border-fuchsia-300/20 rounded-lg p-4"
                        >
                            <div className="flex items-center">
                                <CreditCard className="h-6 w-6 text-fuchsia-500 mr-4" />
                                <div>
                                    <p className="font-lato font-medium text-gray-800">{method.type}</p>
                                    <p className="text-sm text-gray-500 font-lato">
                                        {method.lastFour ? `Ending in ${method.lastFour}, Exp: ${method.expiry}` : method.email}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    const updatedMethods = paymentMethods.filter((m) => m.id !== method.id);
                                    setPaymentMethods(updatedMethods);
                                    localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
                                    setSuccess('Payment method removed!');
                                    setError('');
                                }}
                                className="text-red-500 hover:underline font-lato text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddPaymentMethod}
                        className="flex items-center text-fuchsia-500 hover:bg-fuchsia-50/10 rounded-lg p-2 font-lato"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Payment Method
                    </button>
                </div>
            </div>

            {/* Feedback */}
            {error && <p className="text-red-500 text-sm font-lato text-center mt-4">{error}</p>}
            {success && <p className="text-green-500 text-sm font-lato text-center mt-4">{success}</p>}
        </div>
    );
};

export default WalletPayments;
