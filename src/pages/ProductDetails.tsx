import React, { useState } from 'react';

import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { LuShoppingCart } from 'react-icons/lu';
import ProductCard from '../components/Product/ProductCard';
import { Button, Img, Line, Text } from '../components/index';
import { useGetProductDetailsQuery, useGetSimilarProductsQuery } from '../redux/api/productApi';
import { RootState, server } from '../redux/store';
import { SkeletonLoader } from '../components/Loader';
import { useSelector } from 'react-redux';
import { useAddToCartMutation } from '../redux/api/cartApi';
import { responseToast } from '../utils/features';
import toast from 'react-hot-toast';

type ProductDetails = {
	image: string;
	name: string;
	price: number;
	id: number;
	description: string;
};

const ProductDetails: React.FC = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state: RootState) => state.user);
	const { id } = useParams();

	const { data: productDetails, isLoading, isError } = useGetProductDetailsQuery(id!);
	const product = productDetails?.product;

	const { data: similar } = useGetSimilarProductsQuery(id!);
	const similarProducts = similar?.products;

	const [quantity, setQuantity] = useState<number>(1);

	const [addToCart] = useAddToCartMutation();
	if (isError) {
		return <Navigate to={'/404'} />;
	}

	const handleAddToCart = async () => {
		if (user) {
			const res = await addToCart({ userId: user?._id || '', productId: id || '', quantity });
			responseToast(res);
		} else {
			toast.error('Please login to continue');
			navigate('/login');
		}
	};

	const handleIncreaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	console.log(`${server}/${product?.photo}`);

	return (
		<div className='bg-white-A700 flex flex-col font-poppins gap-8 items-center justify-start mx-auto px-28 sm:px-2 w-full mt-20 '>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<div className='flex flex-col items-center justify-start w-full'>
					<div className='flex md:flex-col flex-row gap-8 sm:gap-1 items-center justify-start max-w-[1632px] mx-auto md:px-5 w-full'>
						<div className='flex md:flex-1 flex-col gap-8 items-center justify-start w-1/2 md:w-full'>
							<Img
								className='md:h-screen sm:h-auto object-cover w-full'
								src={`${server}/${product?.photo}`}
								alt={product?.name}
							/>
						</div>
						<div className='flex md:flex-1 flex-col gap-14 sm:gap-2 items-start justify-start mt-10 w-1/2 md:w-full'>
							<div className='flex flex-col gap-8 items-start justify-start w-auto md:w-full'>
								<div className='flex flex-col items-start justify-start w-full'>
									<Text
										className='md:text-5xl sm:text-[32px] text-[56px] text-gray-800'
										size='txtPoppinsBold56'
									>
										{product?.name}
									</Text>
									<Text
										className='mt-[41px] sm:mt-4 text-4xl sm:text-[32px] md:text-[34px] text-gray-600'
										size='txtPoppinsRegular36Gray500'
									>
										₹{product?.price}
									</Text>
									<Line className='bg-bluegray-100 h-px mt-10 sm:mt-4 w-full' />
									<Text
										className='leading-[32.00px] sm:leading-6 mt-[31px] sm:mt-2 text-gray-700 text-lg w-full'
										size='txtPoppinsRegular18Gray500'
									>
										{product?.description}
									</Text>
								</div>
							</div>
							<div className='flex sm:flex-col sm:gap-4 sm:mt-10  w-full justify-between'>
								<div className='flex flex-row gap-6 items-center justify-start w-[35%] md:w-full'>
									<Text
										className='text-gray-800 text-lg'
										size='txtPoppinsMedium18'
									>
										Quantity
									</Text>
									<div className='border-2 border-gray-800 flex'>
										<button
											className='border-r-2 border-gray-800 px-4 py-2'
											onClick={handleDecreaseQuantity}
										>
											-
										</button>
										<span className='px-4 py-2 bg-gray-800 border-b-2 border-t-2 border-gray-800 text-white-A700'>
											{quantity}
										</span>
										<button
											className='px-4 py-2  border-l-2 border-gray-800'
											onClick={handleIncreaseQuantity}
										>
											+
										</button>
									</div>
								</div>
								<Button
									className='common-pointer cursor-pointer flex items-center justify-center gap-4'
									onClick={handleAddToCart}
									rightIcon={<LuShoppingCart size={24} />}
									shape='square'
									color='gray_800'
									size='xl'
									variant='fill'
								>
									<div className='font-bold leading-[normal] text-left text-lg'>Add to Cart</div>
								</Button>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-8 items-center justify-start max-w-[1632px] mt-[183px] mx-auto md:px-5 w-full'>
						<div className='flex sm:flex-col flex-row md:gap-10 items-start justify-between py-[3px] w-full'>
							<div className='flex sm:flex-1 flex-row sm:mt-0 mt-1 w-1/4 sm:w-full mx-6'>
								<Text
									className='text-4xl sm:text-[32px] md:text-[34px] text-gray-800 whitespace-nowrap'
									size='txtPoppinsBold36'
								>
									Similiar Products
								</Text>
							</div>
							<Img
								className='h-12'
								src='/images/img_button_bluegray_100.svg'
								alt='button'
							/>
						</div>
						<div className='overflow-hidden'>
							<div className='grid grid-cols-5 gap-12 sm:grid-cols-1 md:grid-cols-3'>
								{similarProducts?.map((i) => (
									<ProductCard
										key={i._id}
										id={i._id}
										name={i.name}
										image={i.photo}
										addToCart={() => {}}
										price={i.price}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
