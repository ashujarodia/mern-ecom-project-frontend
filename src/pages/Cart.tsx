import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import cartImage from '../assets/images/cart.jpg';
import { SkeletonLoader } from '../components/Loader';
import { Button, Img, Line, List, Text } from '../components/index';
import { useDecreaseQuantityMutation, useGetCartItemsQuery, useIncreaseQuantityMutation, useRemoveFromCartMutation } from '../redux/api/cartApi';
import { RootState, server } from '../redux/store';
import { responseToast } from '../utils/features';

const Cart: React.FC = () => {
	const { user } = useSelector((state: RootState) => state.user);
	const { data, isLoading } = useGetCartItemsQuery(user?._id || '');
	const [removeFromCart] = useRemoveFromCartMutation();
	const [increaseQuantity] = useIncreaseQuantityMutation();
	const [decreaeQuantity] = useDecreaseQuantityMutation();
	const cartItems = data?.cart[0]?.items;

	const navigate = useNavigate();

	const handleRemoveFromCart = async (productId: string) => {
		const res = await removeFromCart({ productId, userId: user?._id || '' });
		responseToast(res);
	};
	const handleIncreaseQuantity = async (productId: string) => {
		const res = await increaseQuantity({ productId, userId: user?._id || '' });
		responseToast(res);
	};
	const handleDecreaseQuantity = async (productId: string) => {
		const res = await decreaeQuantity({ productId, userId: user?._id || '' });
		responseToast(res);
	};

	return (
		<div className='bg-white-A700 flex flex-col font-poppins gap-[35px] items-center justify-start mx-auto w-full px-8 sm:p-2 mt-12'>
			<div className='flex flex-col items-start justify-start w-full'>
				<Text
					className='text-4xl sm:text-xl text-center w-full mt-8 text-gray-800'
					size='txtPoppinsBold36'
				>
					Shopping Cart
				</Text>
				{isLoading ? (
					<SkeletonLoader />
				) : cartItems?.length ? (
					<>
						<div className='flex  flex-row items-center mt-[50px] sm:mt-8 mx-auto px-40 sm:px-0 w-full gap-8 sm:gap-2'>
							<div className='flex flex-row items-center w-[40%] md:w-full sm:gap-1 gap-4'>
								<div className='flex flex-row gap-6 sm:gap-2 items-center justify-start'>
									<Text
										className='border-2 border-gray-800 border-solid flex h-8 sm:h-5 sm:p-2 items-center justify-center rounded-[50%] text-xl md:text-[22px] text-center text-gray-800 sm:text-sm w-8 sm:w-5'
										size='txtPoppinsMedium24'
									>
										1
									</Text>
									<Text
										className='text-xl  text-gray-800 sm:text-xs whitespace-nowrap'
										size='txtPoppinsMedium24'
									>
										Cart
									</Text>
								</div>
								<Line className='bg-gray-800 h-0.5 my-[27px] sm:my-1 w-[59%]' />
							</div>
							<div className='flex flex-row items-center w-[40%] md:w-full sm:gap-1 justify-between'>
								<div className='flex flex-row gap-6 sm:gap-2 items-center justify-start md:w-full'>
									<Text
										className='border-2 border-bluegray-100 border-solid flex h-8 items-center justify-center sm:p-2 rounded-[50%] text-xl text-bluegray-100 text-center  w-8 sm:w-5 sm:h-5 sm:text-sm'
										size='txtPoppinsMedium24Bluegray100'
									>
										2
									</Text>
									<Text
										className='text-xl text-bluegray-100 sm:text-xs'
										size='txtPoppinsMedium24Bluegray100'
									>
										Checkout
									</Text>
								</div>
								<Line className='bg-bluegray-100 h-0.5 my-[27px] sm:my-1 w-[59%]' />
							</div>
							<div className='flex flex-row gap-[21px] items-center w-[20%] md:w-full sm:gap-1 '>
								<Text
									className='border-2 border-bluegray-100 border-solid flex h-8 items-center justify-center sm:p-2 rounded-[50%] text-xl text-bluegray-100 text-center  w-8 sm:w-5 sm:h-5 sm:text-sm'
									size='txtPoppinsMedium24Bluegray100'
								>
									3
								</Text>
								<Text
									className='text-xl text-bluegray-100 sm:text-xs'
									size='txtPoppinsMedium24Bluegray100'
								>
									Completed
								</Text>
							</div>
						</div>
						<div className='flex flex-col md:gap-10 gap-20 items-end justify-start max-w-[1632px] mt-20 sm:mt-8 mx-auto  w-full px-40 sm:px-3'>
							<div className='flex flex-col gap-8 sm:gap-2 items-center justify-start w-full'>
								<div className='flex flex-col gap-[31px] sm:gap-2 items-center justify-start w-full'>
									<List
										className='flex flex-col gap-[12px] items-center w-full mx-8 sm:w-full'
										orientation='vertical'
									>
										{cartItems?.map((i) => (
											<div
												className='flex flex-1 flex-col gap-6 md:gap-3 items-center justify-start w-full'
												key={i._id}
											>
												<div className='flex w-full justify-between items-center'>
													<Link
														className='flex items-center gap-8 md:gap-2'
														to={`/product/${i.product._id}`}
													>
														<Img
															className='w-20 h-20 md:w-14 md:h-14
													rounded sm:w-16 justify-center m-auto object-cover '
															src={`${server}/${i.product.photo}`}
															alt='placeholder'
														/>
														<Text
															className=' text-gray-800 sm:text-xs max-w-36 md:max-w-20'
															size='txtPoppinsMedium24'
														>
															{i.product.name}
														</Text>
													</Link>
													<div className='border-2 border-gray-800 flex rounded'>
														<button
															className='border-r-2 border-gray-800 px-3 md:px-2 md:py-0 py-1 md:text-sm'
															onClick={() =>
																handleDecreaseQuantity(i.product._id)
															}
														>
															-
														</button>
														<span className='px-3 md:px-2 md:py-0 py-1 bg-gray-800 border-b-2 border-t-2 border-gray-800 text-white-A700 sm:text-sm'>
															{i.quantity}
														</span>
														<button
															className='px-3 py-1 md:px-2 md:py-0  border-l-2 border-gray-800 sm:text-sm'
															onClick={() =>
																handleIncreaseQuantity(i.product._id)
															}
														>
															+
														</button>
													</div>
													<Text
														className=' text-2xl md:text-[22px] text-gray-800 sm:text-base'
														size='txtPoppinsMedium24'
													>
														₹{i.product.price}
													</Text>
													<button
														className='text-3xl sm:text-xl text-red-500'
														onClick={() => handleRemoveFromCart(i.product._id)}
													>
														<MdDelete />
													</button>
												</div>
												<Line className='bg-gray-500 h-px w-full' />
											</div>
										))}
									</List>
								</div>
								<div className='flex flex-col justify-end w-full sm:w-full items-end mt-3 gap-2'>
									<div className='flex gap-4'>
										<Text
											className='text-gray-600'
											size='txtPoppinsMedium18Gray500'
										>
											Subtotal
										</Text>
										<Text
											className='text-gray-800'
											size='txtPoppinsBold36'
										>
											₹{data?.cart[0].subtotal}
										</Text>
									</div>
									<div className='flex gap-4'>
										<Text
											className='text-gray-600'
											size='txtPoppinsMedium18Gray500'
										>
											GST (18%)
										</Text>
										<Text
											className='text-gray-800'
											size='txtPoppinsBold36'
										>
											₹{data?.cart[0].tax}
										</Text>
									</div>
									<div className='flex gap-4'>
										<Text
											className='text-gray-600'
											size='txtPoppinsMedium18Gray500'
										>
											Shipping Charges
										</Text>
										<Text
											className='text-gray-800'
											size='txtPoppinsBold36'
										>
											₹{data?.cart[0].shippingCharges}
										</Text>
									</div>
									<div
										className='flex gap-4 pt-2 
									justify-end'
									>
										<Text
											className='text-gray-600 text-lg'
											size='txtPoppinsMedium18Gray500'
										>
											Total
										</Text>
										<Text
											className='text-gray-800 text-xl'
											size='txtPoppinsBold36'
										>
											₹{data?.cart[0].total}
										</Text>
									</div>
								</div>
							</div>
							<div className='flex gap-8 sm:gap-2 items-center  justify-end sm:w-full'>
								<Button
									className='cursor-pointer font-medium  leading-[normal] min-w-[207px] sm:min-w-fit sm:px-2 text-center text-lg sm:py-1.5 sm:text-sm py-2'
									shape='square'
									color='gray_800'
									variant='outline'
									onClick={() => navigate('/productList/all')}
								>
									Continue Shopping
								</Button>
								<Button
									className='common-pointer cursor-pointer font-medium leading-[normal] text-center text-lg w-[171px] sm:w-fit sm:py-2 sm:text-sm sm:px-3 py-2 px-3'
									onClick={() => navigate('/shipping')}
									shape='square'
									color='gray_800'
									variant='fill'
								>
									Checkout
								</Button>
							</div>
						</div>
					</>
				) : (
					<div className='flex flex-col justify-center items-center w-full h-[60vh]'>
						<img
							src={cartImage}
							alt='Empty cart'
						/>
						<h1 className='text-2xl text-gray-500'>You cart is empty</h1>
						<Button
							className='cursor-pointer font-medium  leading-[normal] min-w-[207px] sm:min-w-fit sm:px-2 text-center text-lg sm:py-1.5 sm:text-sm py-2 mt-8'
							shape='square'
							color='gray_800'
							variant='outline'
							onClick={() => navigate('/productList/all')}
						>
							Continue Shopping
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
