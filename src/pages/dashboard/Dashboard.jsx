import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import Cards from "../../components/dashboard/Cards";
import ActivityChart from "../../components/dashboard/ActivityChart";
import LatestBudgets from "../../components/dashboard/LatestBudgets";


const Dashboard = () => {
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

</main>

      </div>
    </div>
  );
};

export default Dashboard;
