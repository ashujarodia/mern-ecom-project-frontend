import React, { useEffect, useState } from 'react';
import { HiBars3BottomLeft } from 'react-icons/hi2';

import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import { Img, Line, Text } from '../components/index';
import { useGetAllCategoriesQuery } from '../redux/api/categoryApi';
import { useGetAllProductsQuery } from '../redux/api/productApi';
import { server } from '../redux/store';
import { Product } from '../types/types';
import toast from 'react-hot-toast';
import { SkeletonLoader } from '../components/Loader';

const ProductList: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { category } = useParams();

	const { data: allProducts, isLoading: productLoading, isError: productError } = useGetAllProductsQuery('');
	const products = allProducts?.products;

	const { data: allCategories, isLoading: categoryLoading, isError: categoryError } = useGetAllCategoriesQuery('');
	const categories = allCategories?.categories;

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [searchedInput, setSearchedInput] = useState<string>('');
	const [sortBy, setSortBy] = useState<string>('');
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(products!);

	useEffect(() => {
		const productsFiltered = products?.filter((product) => {
			if (selectedCategory && product.category !== selectedCategory) {
				return false;
			}
			if (searchedInput && !product.name.toLowerCase().includes(searchedInput.toLowerCase())) {
				return false;
			}
			return true; // Return true if neither condition matches
		});
		setFilteredProducts(productsFiltered!);
	}, [searchedInput, selectedCategory, products]);

	useEffect(() => {
		if (category && category !== 'all') {
			setSelectedCategory(category);
		}
	}, [category]);

	useEffect(() => {
		const sortedProducts = () => {
			let sorted = filteredProducts && [...filteredProducts!];
			if (sortBy === 'lowToHigh') {
				sorted = sorted.sort((a, b) => a.price - b.price);
			} else if (sortBy === 'highToLow') {
				sorted = sorted.sort((a, b) => b.price - a.price);
			}
			setFilteredProducts(sorted);
		};
		sortedProducts();
	}, [sortBy]);

	if (productError || categoryError) {
		toast.error('An error occured');
	}

	return (
		<div className='bg-white-A700 flex flex-col font-poppins gap-9 items-center justify-start mx-auto w-full  sm:px-1 my-8'>
			<div className='flex flex-col items-start justify-start w-full'>
				<div className='flex flex-row gap-4 sm:gap-2 items-start justify-start mt-12 sm:mt-4 md:ml-12 md:px-5 w-[11%] md:w-full ml-64'>
					<Link to={'/'}>
						<Text
							className='text-gray-500 text-lg sm:text-sm'
							size='txtPoppinsMedium18Gray500'
						>
							Home
						</Text>
					</Link>
					<Text
						className='text-bluegray-100 text-lg sm:text-sm'
						size='txtPoppinsMedium18Bluegray100'
					>
						<>&gt;</>
					</Text>
					<Text
						className='text-gray-800 text-lg sm:text-sm'
						size='txtPoppinsMedium18'
					>
						Products
					</Text>
				</div>
				<Text
					className='text-4xl sm:text-2xl sm:mt-4 w-full text-center text-gray-800'
					size='txtPoppinsBold36'
				>
					{selectedCategory ? selectedCategory.toUpperCase() : 'All Products'}
				</Text>
				<div className='flex flex-col gap-8 items-start justify-start  sm:mt-6 mx-auto md:px-5 w-full overflow-y-auto'>
					<button
						className='absolute top-0 mt-20  left-0 ml-4 text-3xl'
						onClick={() => setOpen(!open)}
					>
						<HiBars3BottomLeft />
					</button>

					{/* Filters */}
					<div
						className={`flex flex-col items-start justify-start pt-1.5 w-64 transition  duration-300 min-h-screen mt-12 fixed md:fixed top-0  left-0 bg-white-A700 z-50   px-4 ${
							open ? '-translate-x-0' : '-translate-x-full'
						}`}
					>
						<button
							className='absolute top-0  md:block mt-4 right-0 mr-4 text-3xl'
							onClick={() => setOpen(!open)}
						>
							<HiBars3BottomLeft />
						</button>
						<div className='flex flex-col gap-6 items-start justify-start w-full'>
							<div className='flex flex-col gap-2 items-start justify-center w-full mt-12'>
								<Text
									className='text-gray-800 text-lg text-center w-full'
									size='txtPoppinsMedium18'
								>
									Categories
								</Text>
								<Line className='bg-bluegray-100 h-px w-full' />
							</div>
							{categoryLoading ? (
								<SkeletonLoader />
							) : (
								<div className='flex flex-col gap-2 items-start justify-start w-full'>
									{categories?.map((i) => (
										<div
											className={`flex flex-row gap-4 items-center justify-center py-2  rounded-md w-full cursor-pointer ${
												selectedCategory === i.name.toLowerCase() && 'bg-gray-200'
											}`}
											onClick={() =>
												setSelectedCategory(
													selectedCategory === i.name.toLowerCase() ? '' : i.name.toLowerCase()
												)
											}
											key={i._id}
										>
											<Img
												className='h-8 w-8'
												src={`${server}/${i.photo}`}
												alt={i.name}
											/>
											<Text
												className={`text-gray-500  w-auto text-lg  ${
													selectedCategory === i.name.toLowerCase() &&
													'text-gray-600 font-semibold'
												}`}
												size='txtPoppinsRegular18Gray500'
											>
												{i.name}
											</Text>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Search bar */}
					<div className='mt-10 w-full flex relative'>
						<input
							type='text'
							name=''
							id=''
							className='border-b border-gray-300  py-0.5 w-1/2 mx-auto md:w-full'
							placeholder='🔍 Search products here'
							value={searchedInput!}
							onChange={(e) => setSearchedInput(e.target.value)}
						/>
					</div>
					{productLoading ? (
						<SkeletonLoader />
					) : (
						<div
							className={`flex md:flex-1 flex-col gap-8 items-center justify-center w-[84%]  md:ml-0 md:w-full px-8  md:transition-none transition duration-300 ${
								open ? 'translate-x-60 md:translate-x-0' : 'translate-x-0 mx-auto'
							}`}
						>
							<div className='flex sm:flex-col flex-row md:gap-10 items-start justify-between pt-0.5 w-full'>
								<Text
									className='sm:mt-0 mt-1 text-gray-500 text-lg sm:text-sm'
									size='txtPoppinsMedium18Gray500'
								>
									<span className='text-gray-500 font-poppins text-left font-medium'>Viewing </span>
									<span className='text-gray-800 font-poppins text-left font-medium'>{filteredProducts?.length}</span>
									<span className='text-gray-500 font-poppins text-left font-medium'> of </span>
									<span className='text-gray-800 font-poppins text-left font-medium'>{filteredProducts?.length}</span>
									<span className='text-gray-500 font-poppins text-left font-medium'> products</span>
								</Text>

								<select
									className='border border-gray-300 px-1 py-0.5 rounded text-gray-600'
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
								>
									<option value=''>Sort by</option>
									<option value='lowToHigh'>Price : Low to High</option>
									<option value='highToLow'>Price: High to low</option>
								</select>
							</div>
							<div className='flex flex-col gap-14 items-center justify-start w-full'>
								<div className='flex flex-col items-center justify-start w-full'>
									<div className='gap-8 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center min-h-[auto] w-full'>
										{filteredProducts?.map((i) => (
											<ProductCard
												key={i._id}
												id={i._id}
												name={i.name}
												image={i.photo?.url}
												addToCart={() => {}}
												price={i.price}
											/>
										))}
									</div>
								</div>
								{/* <div className='flex flex-row gap-6 items-center justify-start w-auto'>
								<Img
									className='h-6 w-6'
									src='images/img_arrowleft.svg'
									alt='arrowleft'
								/>
								<Button
									className='cursor-pointer h-[50px] leading-[normal] text-center text-lg w-[50px]'
									shape='square'
									color='gray_800'
									size='lg'
									variant='fill'
								>
									1
								</Button>
								<Button
									className='cursor-pointer h-[51px] leading-[normal] text-center text-lg w-[51px]'
									shape='square'
									color='gray_500'
									size='lg'
									variant='outline'
								>
									2
								</Button>
								<Button
									className='cursor-pointer h-[51px] leading-[normal] text-center text-lg w-[51px]'
									shape='square'
									color='gray_500'
									size='lg'
									variant='outline'
								>
									3
								</Button>
								<Img
									className='h-6 w-6'
									src='images/img_info_24X24.svg'
									alt='info'
								/>
							</div> */}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
