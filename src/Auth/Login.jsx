import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaUser, FaLock, FaGithub } from "react-icons/fa";
import Lottie from 'lottie-react';
import LoginAnimation from '../../public/Login.json';
import { useForm } from 'react-hook-form';
import { CircleX } from 'lucide-react';
import useAuth from '../Hooks/useAuth';
import { GoogleAuthProvider } from 'firebase/auth';
import useAxiosSucure from '../Hooks/useAxiosSucure';
import Swal from 'sweetalert2';

const Login = () => {
  const { Login, GoogleSignIn } = useAuth();
  const axiosSecure =useAxiosSucure();
  const [logLoading, setLogLoading] = useState(true)
  const provider = new GoogleAuthProvider();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setLogLoading(false)
    const { email, password } = data;
    Login(email, password).then(res => {
      console.log(res);
      setLogLoading(true)
    }).catch(error => {
      console.log(error)
      setLogLoading(true)
    })
    console.log(data);
  }
  const handelLogin = () => {
    GoogleSignIn(provider).then(async (res) => {
      const result = res.user;
      console.log(result?.email)
      const userInfo = {
        email: result?.email,
        displayName: result?.displayName,
        photoURL: result?.photoURL,
        role: "user",
        login_at: new Date().toISOString()
      }
      const userData = await axiosSecure.post('/user', userInfo)
      console.log(userData.data)
      if (userData.data.insertedId|| !userData.data.inserted) {
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true
        });
      }
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <div className="my-26 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl flex overflow-hidden">

        {/* Left: Animation */}
        <div className="w-1/2 bg-gradient-to-br from-amber-100 to-purple-100 flex items-center justify-center">
          <Lottie animationData={LoginAnimation} loop={true} className="w-4/5" />
        </div>

        {/* Right: Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="mb-6">
              <div className="relative group w-full">
                <FaLock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 ml-1 z-10" />
                <input
                  type="text"
                  placeholder="Enter Password"
                  {...register("password", { required: "Enter Your Password" })}
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

            {/* Remember Me */}
            <div className="flex items-center mb-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-600 text-sm">Remember me</label>
            </div>

            {/* Login Button */}
            {logLoading ? <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transition">Log In</button> : <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-xl transition"><span class="loading loading-spinner loading-sm"></span> Log In</button>}
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

          {/* Create Account */}
          <p className="text-sm text-gray-600 text-center mt-8">
            Don't have an account?
            <a href="/register" className="text-blue-600 font-medium ml-1 hover:underline">Create One</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
