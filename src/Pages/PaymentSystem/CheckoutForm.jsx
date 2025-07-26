import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { LockKeyhole, User } from 'lucide-react';
import React, { useState } from 'react';
import useAxiosSucure from '../../Hooks/useAxiosSucure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { DotSpinner } from 'ldrs/react'
import 'ldrs/react/DotSpinner.css'

const CheckoutForm = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const { User } = useAuth();
    const stripe = useStripe();
    const axiosSecure = useAxiosSucure()

    const elements = useElements();
    const axiosSucure = useAxiosSucure()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setLoading(false)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        const res = await axiosSucure.post("/create-payment-intent", {
            amount: data?.price * 100
        })
        const clientSecret = (res.data.clientSecret);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: User?.displayName,
                    email: User?.email
                }
            }
        })
        console.log(result)
        if (result) {
            const paymentData = {
                planID: data?._id,
                email: User?.email,
                name: User?.displayName,
                amount: data?.price * 100,
                transaction_id: result.paymentIntent.id,
                paymentMethod: result.paymentIntent.payment_method_types,
                paid_ata_string: new Date().toISOString()
            }
            try {
                const paymentres = await axiosSecure.post('/create-payment-history', paymentData);
                console.log(paymentres);

                if (paymentres.data.insertedId) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Payment Successful!',
                        html: `
                    <p><strong>Transaction ID:</strong> ${result.paymentIntent.id}</p>
                `,
                        icon: 'success',
                        confirmButtonText: 'Go My Parsel'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // navigate('/dashboard/myParcel');
                        }
                    });
                    console.log(" Payment Successfully stored in DB.");
                }
            } catch (err) {
                setLoading(false)
                console.error(" Failed to store payment history:", err);
            }
        }
    }
    return (
        <div className="mt-10">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-amber-600 mb-4 text-center">
                    {data?.name}
                </h2>
                <p className="text-sm text-slate-600 mb-6 text-center">
                    {'Full access to premium news.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="p-4 border border-amber-300 rounded-xl bg-white shadow-sm">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#1e293b',
                                        '::placeholder': {
                                            color: '#cbd5e1',
                                        },
                                    },
                                    invalid: {
                                        color: '#dc2626',
                                    },
                                },
                            }}
                        />
                    </div>

                    {
                        loading ? <button
                            type="submit"
                            disabled={!stripe}
                            className="w-full items-center cursor-pointer py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:opacity-90 transition duration-200"
                        >

                            <DotSpinner
                                size="24"
                                speed="0.9"
                                color="white"
                            />
                        </button> : <button
                            type="submit"
                            disabled={!stripe}
                            className="w-full cursor-pointer items-center py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:opacity-90 transition duration-200"
                        >
                            Pay {data?.price}
                        </button>
                    }
                </form>

                <div className="mt-6 flex justify-center font-bold items-center gap-2 text-center text-sm text-amber-500">
                    <LockKeyhole size={15} /> Secured by Stripe
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;