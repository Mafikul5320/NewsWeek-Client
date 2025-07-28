import React from 'react';
import { Chart } from 'react-google-charts';
import { Users, Eye, Crown, FileText, CalendarDays } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSucure from '../../Hooks/useAxiosSucure';

// const publisherData = [
//   ['Publisher', 'Articles'],
//   ['TechNews Daily', 25],
//   ['Global Times', 18],
//   ['Sports Weekly', 22],
//   ['Health Today', 15],
//   ['Business Insider', 20],
// ];

// const growthData = [
//   ['Month', 'Users', 'Articles', 'Views'],
//   ['Jan', 500, 200, 15000],
//   ['Feb', 600, 300, 20000],
//   ['Mar', 700, 400, 30000],
//   ['Apr', 800, 500, 40000],
//   ['May', 850, 600, 50000],
//   ['Jun', 900, 700, 60000],
// ];

const engagementData = [
  ['Hour', 'Active Users'],
  ['00:00', 120],
  ['04:00', 90],
  ['08:00', 200],
  ['12:00', 450],
  ['16:00', 350],
  ['20:00', 250],
  ['24:00', 100],
];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSucure()

  const { data: allData, isLoading } = useQuery({
    queryKey: ["adminData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chart/overview")
      return res.data
    }
  });
  const { data: growthData,  } = useQuery({
    queryKey: ["growthData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/dashboard/monthly-growth")
      return res.data
    }
  });
  const { data: publisherData,  } = useQuery({
    queryKey: ["publisherData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chart/publisher-percentage")
      return res.data
    }
  });


  if (isLoading || !allData) {
    return <div className="text-center mt-16 text-xl">Loading...</div>;
  }
  const { totalUsers, premiumUsers, totalArticles } = allData
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-sm text-gray-500">Welcome back! Here's what's happening with your news platform.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays className="w-5 h-5" /> 23/07/2025
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-gray-600 mb-2">Total Users</div>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <div className="text-green-500 text-sm">▲ +12.5%</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-gray-600 mb-2">Premium Users</div>
          <div className="text-2xl font-bold">{premiumUsers}</div>
          <div className="text-green-500 text-sm">▲ +8.2%</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-gray-600 mb-2">Total Articles</div>
          <div className="text-2xl font-bold">{totalArticles}</div>
          <div className="text-green-500 text-sm">▲ +15.3%</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-gray-600 mb-2">Total Views</div>
          <div className="text-2xl font-bold">32</div>
          <div className="text-green-500 text-sm">▲ +22.1%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Articles by Publisher</h3>
          <Chart
            chartType="PieChart"
            data={publisherData}
            options={{ pieHole: 1 }}
            width="100%"
            height="300px"
          />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Monthly Growth Trends</h3>
          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={growthData}
            options={{
              colors: ['#1e3a8a', '#eab308', '#ef4444'],
              curveType: 'function',
              legend: { position: 'bottom' },
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">User Engagement (24h)</h3>
        <Chart
          chartType="AreaChart"
          width="100%"
          height="300px"
          data={engagementData}
          options={{
            colors: ['#3b82f6'],
            fillOpacity: 0.2,
            hAxis: { title: 'Hour' },
            vAxis: { title: 'Active Users' },
            legend: { position: 'bottom' },
          }}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
