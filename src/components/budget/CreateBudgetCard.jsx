const CreateBudgetCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border-2 border-dashed border-gray-300 
                 p-5 flex flex-col items-center justify-center
                 cursor-pointer hover:border-blue-500 hover:text-blue-600
                 transition"
    >
      <div className="text-3xl mb-2">➕</div>
      <p className="font-medium">Create New Budget</p>
    </div>
  );
};

export default CreateBudgetCard;
