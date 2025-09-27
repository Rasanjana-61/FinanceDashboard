// import React from 'react';

// const FinancialFilter = ({ dateRange, onFilterChange }) => {
//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     onFilterChange({ ...dateRange, [name]: value });
//   };

//   return (
//     <div className="flex space-x-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
//         <input
//           type="date"
//           name="startDate"
//           value={dateRange.startDate}
//           onChange={handleDateChange}
//           className="input-field"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//         <input
//           type="date"
//           name="endDate"
//           value={dateRange.endDate}
//           onChange={handleDateChange}
//           className="input-field"
//         />
//       </div>
//     </div>
//   );
// };

// export default FinancialFilter;

// frontend/src/pages/financialmanager/FinancialFilter.jsx
import React from 'react';

const FinancialFilter = ({ dateRange, onFilterChange }) => {
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...dateRange, [name]: value });
  };

  return (
    <div className="flex space-x-6 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={dateRange.startDate}
          onChange={handleDateChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
        <input
          type="date"
          name="endDate"
          value={dateRange.endDate}
          onChange={handleDateChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default FinancialFilter;