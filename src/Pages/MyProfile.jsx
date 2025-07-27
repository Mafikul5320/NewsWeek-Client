import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaImage } from "react-icons/fa";
import { CircleX } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSucure from "../Hooks/useAxiosSucure";

const MyProfile = () => {
  const { User, UpdateUser } = useAuth()
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [preview, setPreview] = useState(null);
  const [RegLoading, setregLoading] = useState(true)
  const axiosSecure= useAxiosSucure();

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image)
    if (image) {
      const uploadImage = await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_imagebb_key}`, formData)

      setPreview(uploadImage.data.data.url);
    }
    console.log(preview)
  }
  const onSubmit = (data) => {
    console.log(data)
    UpdateUser({
      displayName: data?.displayName,
      photoURL: preview
    }).then(async () => {

      const res = await axiosSecure.patch('/user', {
        displayName: data?.displayName,
        photoURL: preview,
        email: User?.email,

      })
      console.log(res)
      if (res.data.insertedId) {
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true
        });
      }
      setregLoading(true)

    }).catch(error => {
      console.log(error)
      setregLoading(true)
    })

  }
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
              <img className="w-24 h-24 rounded-full" src={User?.photoURL} alt="" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">{User?.displayName}</h2>
            <p className="text-sm text-slate-500 mb-2">{User?.email}</p>
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Display Name</label>
                  <input
                    type="text"
                    defaultValue={User?.displayName}
                    {...register("displayName", { required: "Enter Your Name" })}
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  {errors.displayName && <p className='flex items-center gap-1 pt-1 text-orange-600 font-mono text-sm'> <CircleX size={12} />{errors.displayName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={User?.email}
                    disabled
                    className="w-full border rounded-lg px-4 py-2 text-sm bg-slate-100 text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-1">Email cannot be changed for security reasons</p>
                </div>
                <div className="mb-6 relative">
                  <div className="flex items-center gap-4">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className=" object-cover border border-gray-200 absolute  right-1 w-11 h-11 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 absolute  right-1">
                        <FaImage className="text-gray-400 text-xl w-16 h-16 p-2 rounded-full" />
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      {...register("profile_img", { required: "Upload your profile image" })}
                      onChange={handleImageChange}
                      className="block w-full border rounded-lg px-4 py-2 text-sm text-gray-500 file:mr-4 file:py-1 file:px-3
                           file:rounded-full file:border-0 file:text-sm file:font-medium
                           file:bg-amber-100 file:text-amber-600 hover:file:bg-amber-300"
                    />
                  </div>
                  <div className='border-b border-b-gray-300 pt-2' />
                  {errors.profile_img && <p className='flex items-center gap-1 pt-1 text-orange-600 font-mono text-sm'> <CircleX size={12} />{errors.profile_img.message}</p>}
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
