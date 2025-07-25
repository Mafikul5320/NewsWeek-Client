import React, { useState } from 'react';
import { FaGoogle, FaUser, FaLock, FaEnvelope, FaCheck, FaImage, FaGithub } from "react-icons/fa";
import Lottie from 'lottie-react';
import RegisterAnimation from '../../public/Register.json';
import { useForm } from 'react-hook-form';
import { CircleX } from 'lucide-react';
import useAuth from '../Hooks/useAuth';
import { GoogleAuthProvider } from 'firebase/auth';

const Register = () => {
  const { Register, GoogleSignIn, UpdateUser } = useAuth();
  const [RegLoading, setregLoading] = useState(true)
  const provider = new GoogleAuthProvider();
  const [preview, setPreview] = useState(null);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setregLoading(false)
    const { email, password, displayName } = data;
    console.log(displayName, preview)
    Register(email, password).then(res => {
      setregLoading(true)
      console.log(res)
      UpdateUser({
        displayName,
        photoURL: preview
      }).then(() => {
        setregLoading(true)
      }).catch(error => {
        console.log(error)
        setregLoading(true)
      })
    }).catch(error => {
      console.log(error)
      setregLoading(true)
    })
  };
  const handelLogin = () => {
    GoogleSignIn(provider).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error)
    })
  }
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
    console.log(image)
  }

  return (
    <div className="my-20 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl flex overflow-hidden">

        {/* Left: Animation */}
        <div className="w-1/2 bg-gradient-to-br from-purple-100 to-amber-100 flex items-center justify-center">
          <Lottie animationData={RegisterAnimation} loop={true} className="w-4/5" />
        </div>

        {/* Right: Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Create Account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <div className="relative group w-full">
                <FaUser className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 ml-1 z-10" />
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("displayName", { required: "Enter Your Name" })}
                  className="pl-8 w-full bg-transparent py-2 text-gray-800 outline-none border-none"
                />
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-300"></span>
                <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-focus-within:left-0 group-focus-within:w-full transition-all duration-500 ease-in-out"></span>
              </div>
              {errors.displayName && <p className='flex items-center gap-1 pt-1 text-orange-600 font-mono text-sm'> <CircleX size={12} />{errors.displayName.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-6">
              <div className="relative group w-full">
                <FaUser className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 ml-1 z-10" />
                <input
                  type="text"
                  {...register("email", {
                    required: "Email Address is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                  })}
                  placeholder="Enter Your Email"
                  className="pl-8 w-full bg-transparent py-2 text-gray-800 outline-none border-none"
                />
                {/* static light border line */}
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-300"></span>

                {/* animated border line */}
                <span
                  className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500
      group-focus-within:left-0 group-focus-within:w-full transition-all duration-500 ease-in-out"
                ></span>
              </div>
              {errors.email && <p className='flex items-center gap-1 pt-1 text-orange-600 font-mono text-sm'> <CircleX size={12} />{errors.email.message}</p>}
            </div>
            {/* Image Upload */}
            <div className="mb-6 relative">
              <div className="flex items-center gap-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className=" object-cover border border-gray-200 absolute -top-3.5 right-1 w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 absolute -top-3.5 right-1">
                    <FaImage className="text-gray-400 text-xl w-16 h-16 p-2 rounded-full" />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  {...register("profile_img", { required: "Upload your profile image" })}
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-3
                           file:rounded-full file:border-0 file:text-sm file:font-medium
                           file:bg-amber-100 file:text-amber-600 hover:file:bg-amber-300"
                />
              </div>
              <div className='border-b border-b-gray-300 pt-2' />
              {errors.profile_img && <p className='flex items-center gap-1 pt-1 text-orange-600 font-mono text-sm'> <CircleX size={12} />{errors.profile_img.message}</p>}
            </div>

            {/* Password */}
            <div className="mb-6">
              <div className="relative group w-full">
                <FaLock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 ml-1 z-10" />
                <input
                  type="text"
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Enter Your Password", minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                      message: `Must include uppercase, lowercase, number, special character`,
                    },
                  })}
                  className="pl-8 w-full bg-transparent py-2 text-gray-800 outline-none border-none"
                />

                {/* static light border line */}
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-300"></span>

                {/* animated border line */}
                <span
                  className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500
      group-focus-within:left-0 group-focus-within:w-full transition-all duration-500 ease-in-out"
                ></span>
              </div>
              {errors.password && <p className='flex items-center gap-1 pt-1 text-orange-600 font-mono text-sm'> <CircleX size={12} />{errors.password.message}</p>}
            </div>

            {/* Register Button */}
            {RegLoading ? <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transition">Register</button> : <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transition"><span class="loading loading-spinner loading-sm"></span> Register</button>}
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 mt-10 mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="text-gray-400 text-sm">or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="flex gap-4 justify-center">
            <button onClick={handelLogin} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <FaGoogle />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <FaGithub />
            </button>
          </div>
          {/* Login Link */}
          <p className="text-sm text-gray-600 text-center mt-8">
            Already have an account?
            <a href="/login" className="text-blue-600 font-medium ml-1 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
