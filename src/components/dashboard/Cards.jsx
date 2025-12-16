const Cards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Total Spend */}
      <div className="bg-white rounded-xl p-5 border border-blue-100 hover:shadow-md transition flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Total Spent</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            ₹24,500
          </h2>
          <p className="text-xs text-blue-600 mt-1">
            This month
          </p>
        </div>

        {/* Icon placeholder */}
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
          💳
        </div>
      </div>

      {/* Budget */}
      <div className="bg-white rounded-xl p-5 border border-sky-100 hover:shadow-md transition flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Monthly Budget</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            ₹40,000
          </h2>

          {/* Progress */}
          <div className="mt-2 h-2 w-32 bg-sky-100 rounded-full overflow-hidden">
            <div className="h-full w-[60%] bg-sky-500 rounded-full"></div>
          </div>

          <p className="text-xs text-sky-600 mt-1">
            60% used
          </p>
        </div>

        {/* Icon placeholder */}
        <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xl">
          📊
        </div>
      </div>

      {/* Savings */}
      <div className="bg-white rounded-xl p-5 border border-indigo-100 hover:shadow-md transition flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Savings</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            ₹15,500
          </h2>
          <p className="text-xs text-indigo-600 mt-1">
            After expenses
          </p>
        </div>

        {/* Icon placeholder */}
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">
          💰
        </div>
      </div>

    </div>
  );
};

export default Cards;
