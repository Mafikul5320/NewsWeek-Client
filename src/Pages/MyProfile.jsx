import React from "react";

const MyProfile = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">My Profile</h1>
        <p className="text-center text-slate-500 mb-10">
          Manage your account information and preferences
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center h-[65%]">
            <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 flex items-center justify-center relative mb-4">
              <span className="text-4xl text-slate-400">👤</span>
              <div className="absolute bottom-1 right-1 bg-yellow-400 rounded-full p-1 text-white text-xs">📷</div>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Aavfs</h2>
            <p className="text-sm text-slate-500 mb-2">duhfc5@gmail.com</p>
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full inline-block mb-4">Free Member</span>

            <div className="flex justify-around text-slate-700 text-sm">
              <div>
                <span className="block text-xl font-bold">12</span>
                <span>Articles Read</span>
              </div>
              <div>
                <span className="block text-xl font-bold">3</span>
                <span>Articles Published</span>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 ">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Profile Information</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Display Name</label>
                  <input
                    type="text"
                    defaultValue="Aavfs"
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue="duhfc5@gmail.com"
                    disabled
                    className="w-full border rounded-lg px-4 py-2 text-sm bg-slate-100 text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-1">Email cannot be changed for security reasons</p>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Profile Picture URL</label>
                  <input
                    type="text"
                    placeholder="Enter profile picture URL"
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:bg-orange-400 text-white font-medium px-6 py-2 rounded-lg cursor-pointer shadow transition duration-200"
                >
                  Save Changes
                </button>
              </form>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Account Actions</h3>
              <div className="border border-amber-300 rounded-lg p-4 bg-amber-50 text-yellow-800 flex justify-between items-center">
                <div>
                  <p className="font-medium">Upgrade to Premium</p>
                  <p className="text-sm">Get unlimited access to premium content</p>
                </div>
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-500 cursor-pointer">
                  Upgrade
                </button>
              </div>
              <div className="border rounded-lg p-4 bg-red-50 text-red-700 flex justify-between items-center">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm">Permanently delete your account and data</p>
                </div>
                <button className="text-red-600 font-semibold hover:underline">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
