import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const CreateBudgetModal = ({ onClose, onCreate }) => {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Budget name is required";
    if (!amount || Number(amount) <= 0) e.amount = "Enter a valid amount";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onCreate({ id: Date.now(), icon: icon || "💰", name: name.trim(), amount: Number(amount), expenses: [] });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-slate-900">Create New Budget</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition"
          >
            ✕
          </button>
        </div>

        {/* Emoji */}
        <div className="mb-4 relative">
          <label className="block text-xs font-medium text-slate-500 mb-2">Icon</label>
          <div
            onClick={() => setShowPicker((p) => !p)}
            className="w-14 h-14 flex items-center justify-center rounded-2xl border-2
                       border-dashed border-slate-200 cursor-pointer hover:border-blue-400
                       text-2xl transition-all duration-200"
          >
            {icon || "➕"}
          </div>
          {showPicker && (
            <div className="absolute mt-2 z-30">
              <Picker
                data={data}
                onEmojiSelect={(e) => { setIcon(e.native); setShowPicker(false); }}
                previewPosition="none"
                theme="light"
              />
            </div>
          )}
        </div>

        {/* Name */}
        <div className="mb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="Budget name (e.g. Groceries)"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Amount */}
        <div className="mb-5">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field"
            placeholder="Budget limit (₹)"
          />
          {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 btn-secondary border border-slate-200">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium
                       hover:bg-blue-700 active:scale-[0.98] transition-all duration-200"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBudgetModal;
