import React from 'react';
import PaymentAnimation from '../../../public/CreditCard.json'
import Lottie from 'lottie-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import useAxiosSucure from '../../Hooks/useAxiosSucure';
import { useParams } from 'react-router';
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const PaymentPage = () => {
  const { User } = useAuth();
  const axiosSucure = useAxiosSucure();
  const params = useParams()
  console.log(params.id)
  console.log(User?.email)
  const { data } = useQuery({
    queryKey: ["plan", User?.email],
    queryFn: async () => {
      const res = await axiosSucure.get(`/payment?id=${params.id}`)
      return res.data
    }
  })
  console.log(data)
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 p-10 space-y-6 border-amber-200 border-r-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-sm font-bold">K</div>
            <span className="text-sm font-medium">{User?.displayName}</span>
          </div>
          <h2 className="text-gray-700 text-lg font-bold">{data?.name}</h2>
          <h1 className="text-3xl font-bold">${data?.price}</h1>
          <div className="">
            <Lottie animationData={PaymentAnimation} loop={true} />
          </div>
        </div>

        {/* Right Side */}
        <div className='w-1/2 p-10'>
          <Elements stripe={stripePromise}>
            <CheckoutForm data={data}></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;