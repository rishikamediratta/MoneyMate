const CreateBudgetCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card-glow bg-white rounded-2xl border-2 border-dashed border-slate-200
                 p-5 flex flex-col items-center justify-center min-h-[140px]
                 cursor-pointer hover:border-blue-400 hover:text-blue-600
                 text-slate-400 transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-2xl bg-slate-100 group-hover:bg-blue-50
                      flex items-center justify-center text-xl mb-2 transition-all duration-200">
        ➕
      </div>
      <p className="text-sm font-medium">Create New Budget</p>
    </div>
  );
};

export default CreateBudgetCard;
