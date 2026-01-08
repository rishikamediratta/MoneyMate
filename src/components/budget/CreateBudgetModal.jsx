import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";


const CreateBudgetModal = ({ onClose, onCreate }) => {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = () => {
    if (!name || !amount) return;

    onCreate({
      id: Date.now(),
      icon: icon || "💰",
      name,
      amount: Number(amount),
      expenses: []
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm relative">
        <h2 className="text-lg font-semibold mb-4">Create New Budget</h2>

        {/* Emoji Selector */}
       {/* Emoji Selector */}
<div className="mb-4 relative">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Icon
  </label>

  {/* Square placeholder */}
  <div
    onClick={() => setShowEmojiPicker((prev) => !prev)}
    className="w-14 h-14 flex items-center justify-center
               border-2 border-dashed border-gray-300
               rounded-lg cursor-pointer
               hover:border-blue-500 transition
               text-2xl"
  >
    {icon || "➕"}
  </div>

  {/* Full Emoji Picker */}
  {showEmojiPicker && (
    <div className="absolute mt-2 z-30">
      <Picker
        data={data}
        onEmojiSelect={(emoji) => {
          setIcon(emoji.native);
          setShowEmojiPicker(false);
        }}
        previewPosition="none"
        theme="light"
      />
    </div>
  )}
</div>


        {/* Budget Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 border rounded-lg p-2"
          placeholder="Budget name"
        />

        {/* Budget Amount */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 border rounded-lg p-2"
          placeholder="Budget amount"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBudgetModal;
