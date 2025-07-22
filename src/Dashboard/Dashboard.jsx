import { Users } from 'lucide-react';
import React from 'react';
import { NavLink, Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile navbar */}
        <div className="w-full navbar bg-base-300 lg:hidden">
          <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <h2 className="ml-4 text-xl font-semibold">Dashboard</h2>
        </div>

        {/* Page content here */}
       <Outlet></Outlet>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-white  text-base-content">
          {/* Sidebar content */}
          <li ><NavLink to={"/dashboard/all-user"} className={"flex items-center"}><Users size={20} /><span className='pt-1.5'>All Users</span></NavLink></li>
          <li ><NavLink to={"/dashboard/all-articles"} className={"flex items-center"}><Users size={20} /><span className='pt-1.5'>All Articles</span></NavLink></li>
          <li><a>Articles</a></li>
          <li><a>Analytics</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
