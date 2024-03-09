import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { useGetCartItemsQuery } from '../redux/api/cartApi';
import { useGetMyOrdersQuery } from '../redux/api/orderApi';
import { saveShippingInfo } from '../redux/reducer/shippingReducer';
import { RootState, server } from '../redux/store';
import { SkeletonLoader } from '../components/Loader';

const Shipping = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const { data, isLoading: orderLoading } = useGetMyOrdersQuery(user?._id || '');

	const shippingAddress = data?.orders[0]?.shippingInfo;

	const [address, setAddress] = useState<string>(shippingAddress?.address || '');
	const [city, setCity] = useState<string>(shippingAddress?.city || '');
	const [state, setState] = useState<string>(shippingAddress?.state || '');
	const [pincode, setPincode] = useState<string>(shippingAddress?.pincode || '');
	const [country, setCountry] = useState<string>(shippingAddress?.country || '');

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data: cartItems } = useGetCartItemsQuery(user?._id || '');

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		dispatch(saveShippingInfo({ city, state, address, pincode, country }));
		try {
			const { data } = await axios.post(
				`${server}/api/v1/payment/create?userId=${user?._id}`,
				{
					amount: cartItems?.cart[0].total,
					description: 'Test decription',
					name: user?.name,
					address: {
						line1: address,
						postal_code: pincode,
						city,
						state,
						country: 'IN',
					},
				},
				{ headers: { 'Content-Type': 'application/json' } }
			);
			setIsLoading(false);
			navigate('/checkout', { state: data.clientSecret });
		} catch (error) {
			console.error(error);
			toast.error('Something went wrong');
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (shippingAddress) {
			setAddress(shippingAddress?.address);
			setCity(shippingAddress.city);
			setState(shippingAddress.state);
			setPincode(shippingAddress.pincode);
			setCountry(shippingAddress.country);
		}
	}, [shippingAddress]);

	useEffect(() => {
		if (cartItems && cartItems?.cart.length <= 0) {
			return navigate('/cart');
		}
	}, [cartItems]);

	return orderLoading ? (
		<SkeletonLoader />
	) : (
		<div className='max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg'>
			<h2 className='text-xl font-semibold mb-8'>Shipping Details</h2>
			<form onSubmit={submitHandler}>
				<div className='mb-4'>
					<label
						htmlFor='address'
						className='block text-sm font-medium text-gray-700'
					>
						Address:
					</label>
					<input
						type='text'
						id='address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className='mt-1 p-2 border border-gray-300 rounded-md w-full'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='city'
						className='block text-sm font-medium text-gray-700'
					>
						City:
					</label>
					<input
						type='text'
						id='city'
						value={city}
						onChange={(e) => setCity(e.target.value)}
						className='mt-1 p-2 border border-gray-300 rounded-md w-full'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='state'
						className='block text-sm font-medium text-gray-700'
					>
						State:
					</label>
					<input
						type='text'
						id='state'
						value={state}
						onChange={(e) => setState(e.target.value)}
						className='mt-1 p-2 border border-gray-300 rounded-md w-full'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='pincode'
						className='block text-sm font-medium text-gray-700'
					>
						Pincode:
					</label>
					<input
						type='text'
						id='pincode'
						value={pincode}
						onChange={(e) => setPincode(e.target.value)}
						className='mt-1 p-2 border border-gray-300 rounded-md w-full'
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='country'
						className='block text-sm font-medium text-gray-700'
					>
						Country:
					</label>
					<select
						id='country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						className='mt-1 p-2 border border-gray-300 rounded-md w-full'
						required
					>
						<option value=''>Select Country</option>
						<option value='india'>India</option>
					</select>
				</div>
				<Button
					className='common-pointer cursor-pointer font-medium leading-[normal] text-center text-lg w-full  sm:py-2 sm:text-sm sm:px-3 py-2 px-3 mt-4'
					shape='square'
					color='gray_800'
					variant='fill'
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? 'Saving info...' : 'Continue'}
				</Button>
			</form>
		</div>
	);
};

export default Shipping;
