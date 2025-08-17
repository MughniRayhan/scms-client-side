import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';

const PaymentHistory = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [viewType, setViewType] = useState('table');

  // Fetch payments for the logged-in user
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-accent">Payment History</h2>

      {/* Toggle button */}
      <button
        className="btn btn-primary mb-4 transform hover:scale-105 transition duration-300"
        onClick={() => setViewType(viewType === 'table' ? 'card' : 'table')}
      >
        Switch to {viewType === 'table' ? 'Card' : 'Table'} View
      </button>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : viewType === 'table' ? (
        // Table view
        <div className="overflow-x-auto border bg-white dark:bg-gray-800 border-gray-300 rounded-lg">
          <table className="table w-full">
            <thead className="bg-secondary font-bold text-gray-700 dark:bg-orange-400 dark:text-white">
              <tr>
                <th>#</th>
                <th>Court</th>
                <th>Slots</th>
                <th>Date</th>
                <th>Price</th>
                <th>Transaction ID</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.courtType}</td>
                  <td>{payment.slots.join(', ')}</td>
                  <td>{payment.date}</td>
                  <td>${payment.price}</td>
                  <td>{payment.transactionId}</td>
                  <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card view
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payments.map(payment => (
            <div key={payment._id} className="bg-base-200 dark:bg-gray-800 text-white border rounded-2xl sm:p-6 p-4 shadow transform hover:scale-105 transition duration-300 w-full overflaw-hidden">
              <h3 className="text-xl font-bold text-secondary dark:text-orange-400 mb-3 border-b border-primary/40 pb-2">{payment.courtType}</h3>
              <p className='text-gray-300 text-sm w-[95%] mb-1'><strong className='text-white'>Slots:  </strong>  {payment.slots.join(', ')}</p>
              <p className='text-gray-300 text-sm w-[95%] mb-1'><strong className='text-white'>Date:  </strong>  {payment.date}</p>
              <p className='text-gray-300 text-sm w-[95%] mb-1'><strong className='text-white'>Price:  </strong>  ${payment.price}</p>
              <p className='text-gray-300 text-sm w-[95%] mb-1'><strong className='text-white'>Transaction ID:  </strong>  {payment.transactionId}</p>
              <p className='text-gray-300 text-sm'><strong className='text-white'>Payment Date:  </strong>  {new Date(payment.paymentDate).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
