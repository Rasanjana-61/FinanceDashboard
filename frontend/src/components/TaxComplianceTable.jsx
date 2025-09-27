import React, { useState } from 'react';

const TaxComplianceTable = ({ records, onEdit, onDelete, onPayment }) => {
  const [paymentData, setPaymentData] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handlePaymentClick = (record) => {
    setSelectedRecord(record);
    setPaymentData({
      paymentAmount: record.amount - record.paidAmount,
      paymentDate: new Date().toISOString().split('T')[0]
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = () => {
    onPayment(selectedRecord._id, paymentData);
    setShowPaymentModal(false);
    setSelectedRecord(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Partially Paid': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tax Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.taxType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(record.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rs {record.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rs {record.paidAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onEdit(record)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePaymentClick(record)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Payment
                    </button>
                    <button
                      onClick={() => onDelete(record._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPaymentModal && selectedRecord && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/3 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Record Payment</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Tax: {selectedRecord.taxType}</p>
              <p className="text-sm text-gray-600">Period: {selectedRecord.period}</p>
              <p className="text-sm text-gray-600">Total Amount: Rs {selectedRecord.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Already Paid: Rs {selectedRecord.paidAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Remaining: Rs {(selectedRecord.amount - selectedRecord.paidAmount).toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
              <input
                type="number"
                value={paymentData.paymentAmount}
                onChange={(e) => setPaymentData({...paymentData, paymentAmount: e.target.value})}
                className="input-field"
                max={selectedRecord.amount - selectedRecord.paidAmount}
                min="0"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
              <input
                type="date"
                value={paymentData.paymentDate}
                onChange={(e) => setPaymentData({...paymentData, paymentDate: e.target.value})}
                className="input-field"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSubmit}
                className="btn-primary"
              >
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaxComplianceTable;
