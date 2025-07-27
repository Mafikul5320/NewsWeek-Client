import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSucure from '../Hooks/useAxiosSucure';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = useAxiosSucure();
  const queryClient = useQueryClient();

  const { data: allUser } = useQuery({
    queryKey: ["alluser"],
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      return res.data
    }
  })

  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch("/make-admin", { id })
      console.log(res.data)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["alluser"])
    }
  })
  const handleMakeAdmin = (id) => {
    console.log('Make admin clicked for user ID:', id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      const adminMake = makeAdminMutation.mutate(id);
      console.log("update", !adminMake)
      if (result.isConfirmed && !adminMake) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };
  console.log(allUser)
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All Users</h2>
        <span className="bg-white border px-4 py-1 rounded-md text-sm font-medium text-gray-600 shadow">
          Total: {allUser?.length} users
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-700">User</th>
              <th className="px-6 py-4 font-medium text-gray-700">Email</th>
              <th className="px-6 py-4 font-medium text-gray-700">Role</th>
              <th className="px-6 py-4 font-medium text-gray-700">Status</th>
              <th className="px-6 py-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {allUser?.map((user) => (
              <tr key={user._id}>
                {/* User with profile icon */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    <img className='w-10 h-10 rounded-full object-cover' src={user?.photoURL} alt="" />
                  </div>
                  <span className="text-gray-800 font-medium">{user.name}</span>
                </td>

                <td className="px-6 py-4 text-gray-700">{user.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {user?.status?.charAt(0).toUpperCase() + user?.status?.slice(1)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {user?.role !== 'admin' ? (
                    <button
                      onClick={() => handleMakeAdmin(user?._id)}
                      className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="text-sm text-gray-500">Already Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
