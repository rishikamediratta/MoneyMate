const LatestExpenses = ({ transactions, setTransactions }) => {

  // Delete expense
  const deleteExpense = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Latest Expenses
        </h2>
        <p className="text-sm text-gray-500">
          Recently added expenses
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm border-collapse">

          {/* Table Head */}
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Amount</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-center font-semibold">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {transactions.map((expense, index) => (
              <tr
                key={expense.id}
                className={`border-b border-gray-100 transition
                  ${index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  hover:bg-blue-100`}
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {expense.name}
                </td>

                <td className="py-3 px-4 font-semibold text-blue-700 bg-blue-50">
                  ₹{expense.amount}
                </td>

                <td className="py-3 px-4 text-gray-600">
                  {expense.date}
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-full
                               text-red-500 hover:text-white
                               hover:bg-red-500 transition transform hover:scale-105"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {transactions.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No expenses added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestExpenses;
