import React, { useState, useEffect } from 'react';
import { DollarSign, CreditCard, BarChart3, ArrowRight, ChevronDown, Wallet } from 'lucide-react';

const EarningsWithdrawals = () => {
  const [earnings, setEarnings] = useState({
    available: 580,
    pending: 120,
    withdrawn: 1250,
    totalLifetime: 1950
  });
  
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  
  useEffect(() => {
    // Load withdrawal history from localStorage or initialize with mock data
    const storedHistory = localStorage.getItem('withdrawalHistory');
    if (storedHistory) {
      setWithdrawalHistory(JSON.parse(storedHistory));
    } else {
      // Mock withdrawal history
      const mockHistory = [
        { id: 1, date: '2025-05-15', amount: 400, method: 'Bank Transfer', status: 'completed' },
        { id: 2, date: '2025-04-30', amount: 350, method: 'PayPal', status: 'completed' },
        { id: 3, date: '2025-04-10', amount: 300, method: 'Bank Transfer', status: 'completed' },
        { id: 4, date: '2025-03-25', amount: 200, method: 'Bank Transfer', status: 'completed' }
      ];
      setWithdrawalHistory(mockHistory);
      localStorage.setItem('withdrawalHistory', JSON.stringify(mockHistory));
    }
    
    // Load earnings from localStorage or keep default
    const storedEarnings = localStorage.getItem('earnings');
    if (storedEarnings) {
      setEarnings(JSON.parse(storedEarnings));
    }
  }, []);
  
  useEffect(() => {
    // Save earnings to localStorage whenever it changes
    localStorage.setItem('earnings', JSON.stringify(earnings));
  }, [earnings]);
  
  const initiateWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    
    if (isNaN(amount) || amount <= 0 || amount > earnings.available) {
      alert('Please enter a valid withdrawal amount');
      return;
    }
    
    const newWithdrawal = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      amount: amount,
      method: withdrawalMethod === 'bank' ? 'Bank Transfer' : 'PayPal',
      status: 'pending'
    };
    
    // Update withdrawal history
    const updatedHistory = [newWithdrawal, ...withdrawalHistory];
    setWithdrawalHistory(updatedHistory);
    localStorage.setItem('withdrawalHistory', JSON.stringify(updatedHistory));
    
    // Update earnings
    setEarnings({
      ...earnings,
      available: earnings.available - amount,
      pending: earnings.pending + amount
    });
    
    // Reset form
    setWithdrawalAmount('');
    setShowWithdrawForm(false);
    
    // Show confirmation (would be a proper notification in a real app)
    alert(`Withdrawal of $${amount} initiated successfully.`);
  };
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
                      
  // Sample data for the chart (would use real data in production)
  const chartData = {
    week: [100, 120, 80, 150, 95, 110, 125],
    month: [420, 380, 500, 450, 520, 580, 490, 510, 470, 530, 490, 580],
    year: [1200, 1350, 1500, 1650, 1800, 1950]
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold font-serif mb-6">Earnings & Withdrawals</h2>
      
      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-500 mb-1">Available Balance</h3>
          <p className="text-3xl font-bold text-green-500">${earnings.available}</p>
          <div className="mt-2 text-sm text-gray-500">Ready to withdraw</div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-500 mb-1">Pending</h3>
          <p className="text-3xl font-bold">${earnings.pending}</p>
          <div className="mt-2 text-sm text-gray-500">Processing</div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-500 mb-1">Withdrawn</h3>
          <p className="text-3xl font-bold">${earnings.withdrawn}</p>
          <div className="mt-2 text-sm text-gray-500">All time</div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-500 mb-1">Total Earnings</h3>
          <p className="text-3xl font-bold">${earnings.totalLifetime}</p>
          <div className="mt-2 text-sm text-gray-500">Lifetime</div>
        </div>
      </div>
      
      {/* Earnings Chart */}
      <div className="border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Earnings Overview</h3>
          <div className="flex space-x-2 items-center">
            <span className="text-sm text-gray-500">Timeframe:</span>
            <div className="relative">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm flex items-center">
                {selectedTimeframe === 'week' ? 'This Week' : 
                 selectedTimeframe === 'month' ? 'This Month' : 'This Year'}
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="h-60 w-full">
          {/* Simple chart representation */}
          <div className="h-full w-full bg-gray-50 rounded flex items-end justify-between p-4">
            {chartData[selectedTimeframe].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-pink-400 w-8 rounded-t" 
                  style={{ 
                    height: `${(value / Math.max(...chartData[selectedTimeframe])) * 80}%` 
                  }}
                ></div>
                <span className="text-xs mt-1 text-gray-500">
                  {selectedTimeframe === 'week' ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index] :
                   selectedTimeframe === 'month' ? monthNames[index].substring(0,3) :
                   `'${(new Date().getFullYear() - 5 + index).toString().substring(2)}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Withdraw Section */}
      <div className="border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Withdraw Funds</h3>
          <button 
            onClick={() => setShowWithdrawForm(!showWithdrawForm)}
            className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 flex items-center"
          >
            <Wallet className="h-4 w-4 mr-1" />
            {showWithdrawForm ? 'Cancel' : 'Withdraw'}
          </button>
        </div>
        
        {showWithdrawForm && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Withdrawal Amount (Max: ${earnings.available})
              </label>
              <input
                type="number"
                min="1"
                max={earnings.available}
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                placeholder="Enter amount"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <div className="flex space-x-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={withdrawalMethod === 'bank'}
                    onChange={() => setWithdrawalMethod('bank')}
                    className="mr-2"
                  />
                  <span>Bank Transfer</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={withdrawalMethod === 'paypal'}
                    onChange={() => setWithdrawalMethod('paypal')}
                    className="mr-2"
                  />
                  <span>PayPal</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={initiateWithdrawal}
                disabled={!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > earnings.available}
                className={`px-4 py-2 rounded-lg ${
                  !withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > earnings.available
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-pink-400 hover:bg-pink-500'
                } text-white`}
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Withdrawal History */}
      <div>
        <h3 className="font-semibold mb-4">Withdrawal History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {withdrawalHistory.length > 0 ? (
                withdrawalHistory.map((withdrawal) => (
                  <tr key={withdrawal.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(withdrawal.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${withdrawal.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {withdrawal.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        withdrawal.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : withdrawal.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {withdrawal.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No withdrawal history
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsWithdrawals;
