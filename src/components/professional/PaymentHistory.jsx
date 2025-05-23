import React, { useState, useEffect } from 'react';
import { ChevronDown, Download, Filter, Search } from 'lucide-react';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;

  useEffect(() => {
    // Simulating loading payment history from localStorage or initialize with mock data
    const storedPayments = localStorage.getItem('paymentHistory');
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    } else {
      // Mock payment data
      const mockPayments = [
        { id: 1, date: '2025-05-22', service: 'Haircut', customer: 'Alice Brown', amount: 30, status: 'completed' },
        { id: 2, date: '2025-05-20', service: 'Facial', customer: 'Bob Smith', amount: 75, status: 'completed' },
        { id: 3, date: '2025-05-18', service: 'Manicure', customer: 'Carol Davis', amount: 40, status: 'completed' },
        { id: 4, date: '2025-05-15', service: 'Hair Coloring', customer: 'Dave Wilson', amount: 120, status: 'completed' },
        { id: 5, date: '2025-05-12', service: 'Massage', customer: 'Eva Green', amount: 90, status: 'completed' },
        { id: 6, date: '2025-05-10', service: 'Waxing', customer: 'Frank Moore', amount: 45, status: 'completed' },
        { id: 7, date: '2025-05-08', service: 'Pedicure', customer: 'Grace Lee', amount: 35, status: 'completed' },
        { id: 8, date: '2025-05-05', service: 'Hair Treatment', customer: 'Henry Martin', amount: 60, status: 'completed' }
      ];
      setPayments(mockPayments);
      localStorage.setItem('paymentHistory', JSON.stringify(mockPayments));
    }
  }, []);

  // Filter and sort payments
  const filteredPayments = payments
    .filter(payment => {
      const matchesSearch = 
        payment.service.toLowerCase().includes(searchQuery.toLowerCase()) || 
        payment.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

  // Pagination logic
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total amount
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold font-serif mb-6">Payment History</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-500 mb-1">Total Received</h3>
          <p className="text-3xl font-bold text-green-500">${totalAmount}</p>
          <div className="mt-2 text-sm text-gray-500">All time</div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-500 mb-1">This Month</h3>
          <p className="text-3xl font-bold">${payments.filter(p => {
            const paymentDate = new Date(p.date);
            const today = new Date();
            return paymentDate.getMonth() === today.getMonth() && 
                   paymentDate.getFullYear() === today.getFullYear();
          }).reduce((sum, p) => sum + p.amount, 0)}</p>
          <div className="mt-2 text-sm text-gray-500">May 2025</div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-500 mb-1">Completed Jobs</h3>
          <p className="text-3xl font-bold">{payments.length}</p>
          <div className="mt-2 text-sm text-gray-500">All time</div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
        <div className="flex items-center">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services or customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              <span>Filter: {filterStatus === 'all' ? 'All' : filterStatus}</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            {/* Filter dropdown would go here */}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center"
            >
              <span>Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Payment History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPayments.length > 0 ? (
              currentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payment.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-pink-400 hover:text-pink-500 flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Receipt
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No payment records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstPayment + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastPayment, filteredPayments.length)}
                </span>{' '}
                of <span className="font-medium">{filteredPayments.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </button>
                
                {[...Array(totalPages).keys()].map(number => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                      currentPage === number + 1
                        ? 'bg-pink-400 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 -rotate-90" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
