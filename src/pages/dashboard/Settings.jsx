import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

const Settings = () => {
  const [name, setName] = useState(localStorage.getItem("moneymate_name") || "");
  const [saved, setSaved] = useState(false);
  const [clearing, setClearing] = useState(false);

  const handleSave = () => {
    localStorage.setItem("moneymate_name", name.trim() || "User");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearData = () => {
    if (clearing) {
      localStorage.removeItem("moneymate_budgets");
      setClearing(false);
      window.location.reload();
    } else {
      setClearing(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-400 mt-0.5">Manage your account preferences</p>
      </div>

      <div className="max-w-lg space-y-5">
        {/* Profile */}
        <div className="card-glow bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Display Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="input-field"
              />
            </div>
            <button
              onClick={handleSave}
              className={`btn-primary transition-all ${saved ? "!bg-emerald-600" : ""}`}
            >
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-red-600 mb-1">Danger Zone</h2>
          <p className="text-xs text-slate-400 mb-4">
            Permanently delete all your budgets and expenses. This cannot be undone.
          </p>
          <button
            onClick={handleClearData}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${clearing
                ? "bg-red-600 text-white hover:bg-red-700"
                : "border border-red-300 text-red-600 hover:bg-red-50"
              }`}
          >
            {clearing ? "⚠️ Click again to confirm" : "🗑️ Clear All Data"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
