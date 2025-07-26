import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { LockKeyhole } from 'lucide-react';
import React from 'react';
import useAxiosSucure from '../../Hooks/useAxiosSucure';

const CheckoutForm = ({ data }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSucure = useAxiosSucure()

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
        const res = await axiosSucure.post("/create-payment-intent", {
            amount: data?.price * 100
        })
        console.log(res.data.clientSecret)
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

                    <button
                        type="submit"
                        disabled={!stripe}
                        className="w-full items-center py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:opacity-90 transition duration-200"
                    >
                        Pay {data?.price}
                    </button>
                </form>

                <div className="mt-6 flex justify-center font-bold items-center gap-2 text-center text-sm text-amber-500">
                    <LockKeyhole size={15} /> Secured by Stripe
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;