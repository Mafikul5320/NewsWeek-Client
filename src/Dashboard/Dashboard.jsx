import { Home, LayoutDashboard, Users, FileText, PlusCircle, ChevronLeft, ChevronRight, Settings, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile navbar */}
        <div className="w-full navbar bg-base-100 border-b border-gray-200 lg:hidden">
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
          <h2 className="ml-4 text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>

        {/* Page content here */}
        <div className="p-6  min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className={`menu p-4 min-h-full   transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-80'}`}>
          
          {/* Sidebar header */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-8 pb-4 border-b `}>
            {!isCollapsed && <h2 className="text-xl font-bold">Admin Dashboard</h2>}
            <button 
              onClick={toggleSidebar}
              className="btn btn-ghost btn-sm rounded-full p-1  hover:bg-blue-700"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
          
          {/* Navigation items */}
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center rounded-lg py-3 px-4 transition-all duration-200 hover:bg-blue-700 ${isActive ? 'bg-blue-700 font-medium' : ''}`
                }
              >
                <Home size={20} />
                {!isCollapsed && <span className="ml-3">Home</span>}
              </NavLink>
            </li>
            
            <li className="mt-6">
              {!isCollapsed && <div className="text-xs uppercase text-blue-300 font-semibold px-4 mb-2">Main Menu</div>}
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `flex items-center rounded-lg py-3 px-4 transition-all duration-200 hover:bg-blue-700 ${isActive ? 'bg-blue-700 font-medium' : ''}`
                }
              >
                <LayoutDashboard size={20} />
                {!isCollapsed && <span className="ml-3">Overview</span>}
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/dashboard/all-user" 
                className={({ isActive }) => 
                  `flex items-center rounded-lg py-3 px-4 transition-all duration-200 hover:bg-blue-700 ${isActive ? 'bg-blue-700 font-medium' : ''}`
                }
              >
                <Users size={20} />
                {!isCollapsed && <span className="ml-3">All Users</span>}
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/dashboard/all-articles" 
                className={({ isActive }) => 
                  `flex items-center rounded-lg py-3 px-4 transition-all duration-200 hover:bg-blue-700 ${isActive ? 'bg-blue-700 font-medium' : ''}`
                }
              >
                <FileText size={20} />
                {!isCollapsed && <span className="ml-3">All Articles</span>}
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to="/dashboard/add-publisher" 
                className={({ isActive }) => 
                  `flex items-center rounded-lg py-3 px-4 transition-all duration-200 hover:bg-blue-700 ${isActive ? 'bg-blue-700 font-medium' : ''}`
                }
              >
                <PlusCircle size={20} />
                {!isCollapsed && <span className="ml-3">Add Publisher</span>}
              </NavLink>
            </li>
          </ul>
          
          {/* Bottom section */}
          <div className="mt-auto pt-6 border-t border-blue-700">
            <ul className="space-y-2">
              <li>
                <a className="flex items-center rounded-lg py-3 px-4 transition-all duration-200 hover:bg-blue-700">
                  <Settings size={20} />
                  {!isCollapsed && <span className="ml-3">Settings</span>}
                </a>
              </li>
              <li>
                <a className="flex items-center rounded-lg py-3 px-4 transition-all duration-200 hover:bg-blue-700 text-red-200 hover:text-red-100">
                  <LogOut size={20} />
                  {!isCollapsed && <span className="ml-3">Logout</span>}
                </a>
              </li>
            </ul>
            
            {!isCollapsed && (
              <div className="pt-6 px-4">
                <div className="flex items-center">
                  <div className="avatar placeholder">
                    <div className="bg-blue-600 text-white rounded-full w-10">
                      <span>AD</span>
                    </div>
                  </div> 
                  <div className="ml-3">
                    <p className="font-medium text-sm">Admin User</p>
                    <p className="text-xs text-blue-300">admin@example.com</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;