import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import Cards from "../../components/dashboard/Cards";
import ActivityChart from "../../components/dashboard/ActivityChart";
import LatestBudgets from "../../components/dashboard/LatestBudgets";
import LatestExpenses from "../../components/dashboard/LatestExpenses";
import { useState } from "react";


const Dashboard = () => {

const [transactions, settransactions] = useState([
    { id: 1, name: "Groceries", amount: 1200, date: "2025-12-18" },
    { id: 2, name: "Uber Ride", amount: 450, date: "2025-12-17" },
    { id: 3, name: "Netflix", amount: 199, date: "2025-12-16" }
  ])

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <Navbar />

      <div className="flex">
        <Sidebar />

       <main className="flex-1 p-6">
  
  {/* TOP CARDS */}
  <Cards />

  {/* LOWER SECTION */}
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
  
  {/* LEFT */}
  <div className="lg:col-span-2">
    <ActivityChart />
  </div>

  {/* RIGHT */}
  <div>
    <LatestBudgets />
  </div>

</div>
  <LatestExpenses
    transactions={transactions}
  setTransactions={settransactions}  
  />

</main>

      </div>
    </div>
  );
};

export default Dashboard;
