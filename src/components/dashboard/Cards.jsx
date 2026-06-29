import { inr } from "../../utils/format";

const CARD_STYLES = {
  spent: {
    bg: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-400/40",
    icon: "💳",
    iconBg: "bg-blue-400/30",
    label: "Total Spent",
    sub: "This period",
    subColor: "text-blue-100",
  },
  budget: {
    bg: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-400/40",
    icon: "📊",
    iconBg: "bg-emerald-400/30",
    label: "Total Budget",
    sub: null,
    subColor: "text-emerald-100",
  },
  remaining: {
    bg: "from-amber-500 to-amber-600",
    shadow: "shadow-amber-400/40",
    icon: "💰",
    iconBg: "bg-amber-400/30",
    label: "Remaining",
    sub: null,
    subColor: "text-amber-100",
  },
};

const StatCard = ({ style, value, extra }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${style.bg}
                shadow-xl ${style.shadow} text-white
                transition-all duration-300 ease-out cursor-default
                hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]`}
  >
    {/* Decorative circle */}
    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
    <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-white/5" />

    <div className="relative flex justify-between items-start">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-white/70">{style.label}</p>
        <h2 className="text-3xl font-extrabold mt-1">₹{inr(value)}</h2>
        {extra}
      </div>
      <div className={`w-11 h-11 ${style.iconBg} rounded-2xl flex items-center justify-center text-xl backdrop-blur-sm`}>
        {style.icon}
      </div>
    </div>
  </div>
);

const Cards = ({ totalSpent, monthlyBudget, savings, usagePercent }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <StatCard
        style={CARD_STYLES.spent}
        value={totalSpent}
        extra={<p className="text-xs text-blue-100 mt-1 font-medium">This period</p>}
      />
      <StatCard
        style={CARD_STYLES.budget}
        value={monthlyBudget}
        extra={
          <div className="mt-2">
            <div className="h-1.5 w-36 bg-white/30 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full bg-white transition-all duration-500`}
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="text-xs text-emerald-100 mt-1">{usagePercent}% used</p>
          </div>
        }
      />
      <StatCard
        style={{
          ...CARD_STYLES.remaining,
          bg: savings < 0 ? "from-red-500 to-red-600" : "from-amber-500 to-amber-600",
          shadow: savings < 0 ? "shadow-red-400/40" : "shadow-amber-400/40",
        }}
        value={Math.abs(savings)}
        extra={
          <p className="text-xs text-amber-100 mt-1 font-medium">
            {savings < 0 ? "⚠️ Over budget!" : "After expenses"}
          </p>
        }
      />
    </div>
  );
};

export default Cards;
