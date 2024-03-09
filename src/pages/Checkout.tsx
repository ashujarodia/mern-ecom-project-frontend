import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEmptyCartMutation, useGetCartItemsQuery } from '../redux/api/cartApi';
import { useNewOrderMutation } from '../redux/api/orderApi';
import { RootState } from '../redux/store';
import { NewOrderItemRequest } from '../types/apiTypes';
import { responseToast } from '../utils/features';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout = () => {
	const location = useLocation();
	const clientSecret: string | undefined = location.state;
	if (!clientSecret) {
		return <Navigate to={'/shipping'} />;
	}
	return (
		<Elements
			options={{ clientSecret }}
			stripe={stripePromise}
		>
			<CheckoutForm />
		</Elements>
	);
};

export default Checkout;

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const { user } = useSelector((state: RootState) => state.user);
	const { data } = useGetCartItemsQuery(user?._id || '');
	const cart = data?.cart[0];
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	const [newOrder] = useNewOrderMutation();
	const [emptyCart] = useEmptyCartMutation();

	const { shippingInfo } = useSelector((state: RootState) => state.shipping);

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setIsProcessing(true);
		try {
			const orderData: NewOrderItemRequest = {
				shippingInfo,
				orderItems: data?.cart[0].items || [],
				userId: user?._id || '',
				subtotal: cart?.subtotal || 0,
				tax: cart?.tax || 0,
				shippingCharges: cart?.shippingCharges || 0,
				total: cart?.total || 0,
			};

			const { paymentIntent, error } = await stripe.confirmPayment({
				elements,
				confirmParams: { return_url: window.location.origin },
				redirect: 'if_required',
			});
			if (error) {
				setIsProcessing(false);
				return toast.error(error.message || 'Something went wrong');
			}
			if (paymentIntent.status === 'succeeded') {
				const res = await newOrder(orderData);
				emptyCart(user?._id || '');
				responseToast(res, navigate, '/orders');
			}
			setIsProcessing(false);
		} catch (error) {
			console.error(error);
			setIsProcessing(false);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center sm:mx-4 max-w-96 mx-auto h-[90vh]'>
			<h1 className='text-2xl my-3 text-gray-800 font-bold text-center'>Payment</h1>
			<form onSubmit={submitHandler}>
				<PaymentElement />
				<button className='w-full text-center bg-gray-800 py-1 text-white-A700 rounded mt-3'>{isProcessing ? 'Processing...' : `Pay ₹${data?.cart[0]?.total}`}</button>
			</form>
		</div>
	);
};
