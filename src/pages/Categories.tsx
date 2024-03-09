import React from 'react';

import { Link } from 'react-router-dom';

import { Button, CheckBox, Img, Line, List, RatingBar, Text } from '../components/index';

const categories = [
	{
		id: 1,
		name: 'Jacket',
		image: 'images/img_vector_gray_800.svg',
	},
	{
		id: 2,
		name: 'Shirt',
		image: 'images/img_vector_gray_800_100X110.svg',
	},
	{
		id: 3,
		name: 'Pants',
		image: 'images/img_vector_gray_800_113X72.svg',
	},
	{
		id: 4,
		name: 'Skirt',
		image: 'images/img_vector_gray_800_113X93.svg',
	},
	{
		id: 5,
		name: 'Dress',
		image: 'images/img_vector_gray_800_113X80.svg',
	},
	{
		id: 6,
		name: 'Underwear',
		image: 'images/img_vector_gray_800_113X113.svg',
	},
	{
		id: 7,
		name: 'Shoes',
		image: 'images/img_vector_gray_800_80X113.svg',
	},
	{
		id: 8,
		name: 'Accessories',
		image: 'images/img_vector_gray_800_93X113.svg',
	},
];

const Categories: React.FC = () => {
	return (
		<div className='bg-white-A700 flex flex-col font-poppins gap-9 items-center justify-start mx-auto w-full px-8 sm:px-1 my-8'>
			<div className='flex flex-col items-start justify-start w-full'>
				<div className='flex flex-row gap-4 sm:gap-2 items-start justify-start mt-12 sm:mt-4 ml-36 md:ml-[0] md:px-5 w-[11%] md:w-full'>
					<Text
						className='text-gray-500 text-lg sm:text-sm'
						size='txtPoppinsMedium18Gray500'
					>
						Home
					</Text>
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
						Categories
					</Text>
				</div>
				<Text
					className='text-4xl sm:text-2xl sm:mt-4 w-full text-center text-gray-800'
					size='txtPoppinsBold36'
				>
					Categories
				</Text>
				<div className='flex md:flex-col flex-row gap-8 items-start justify-start max-w-[1632px] mt-[75px] sm:mt-2  mx-auto md:px-5 w-full'>
					<div className='flex md:flex-1 sm:hidden flex-col gap-[31px] items-center justify-start w-[16%] md:w-full'>
						<div className='flex flex-col gap-8 items-center justify-start w-full'>
							<div className='flex flex-col gap-8 items-start justify-start pt-0.5 w-full'>
								<div className='flex flex-row items-start justify-between w-full'>
									<Text
										className='mt-1 text-gray-800 text-lg'
										size='txtPoppinsMedium18'
									>
										Filter by Price
									</Text>
									<Img
										className='h-6 w-6'
										src='images/img_arrowdown.svg'
										alt='arrowdown'
									/>
								</div>
								<div className='flex flex-col items-center justify-start w-[68%] md:w-full'>
									<div className='flex flex-col gap-6 items-start justify-start w-auto'>
										<CheckBox
											className='leading-[normal] text-left text-lg'
											inputClassName='h-6 mr-[5px] w-6'
											name='AllPrice'
											id='AllPrice'
											label='All Price'
										></CheckBox>
										<div className='flex flex-row gap-4 items-center justify-start w-[87%] md:w-full'>
											<Button
												className='flex h-6 items-center justify-center w-6'
												shape='square'
												color='gray_800'
												size='xs'
												variant='fill'
											>
												<Img
													src='images/img_checkedbox.svg'
													alt='Checkedbox'
												/>
											</Button>
											<Text
												className='text-gray-800 text-lg'
												size='txtPoppinsRegular18'
											>
												$100 - $250
											</Text>
										</div>
										<CheckBox
											className='leading-[normal] text-left text-lg'
											inputClassName='h-6 mr-[5px] w-6'
											name='250500'
											id='250500'
											label='$250 - $500'
										></CheckBox>
										<CheckBox
											className='leading-[normal] text-left text-lg'
											inputClassName='h-6 mr-[5px] w-6'
											name='7501000'
											id='7501000'
											label='$750 - $1.000'
										></CheckBox>
										<CheckBox
											className='leading-[normal] text-left text-lg'
											inputClassName='h-6 mr-[5px] w-6'
											name='10001500'
											id='10001500'
											label='$1000 - $1.500'
										></CheckBox>
									</div>
								</div>
							</div>
							<Line className='bg-bluegray-100 h-px w-full' />
						</div>
						<div className='flex flex-col gap-8 items-center justify-start w-full'>
							<div className='flex flex-col gap-8 items-start justify-start pt-0.5 w-full'>
								<div className='flex flex-row items-start justify-between w-full'>
									<Text
										className='mt-1 text-gray-800 text-lg'
										size='txtPoppinsMedium18'
									>
										Filter by Rating
									</Text>
									<Img
										className='h-6 w-6'
										src='images/img_arrowdown.svg'
										alt='arrowdown One'
									/>
								</div>
								<div className='flex flex-col items-center justify-start w-[79%] md:w-full'>
									<div className='flex flex-col gap-4 items-start justify-start w-auto'>
										<div className='flex flex-row gap-4 items-center justify-start w-[34%] md:w-full'>
											<div className='border-[3px] border-bluegray-100 border-solid h-6 w-6'></div>
											<Img
												className='h-6 w-6'
												src='images/img_star1.svg'
												alt='StarOne'
											/>
										</div>
										<div className='flex flex-row gap-4 items-center justify-start w-1/2 md:w-full'>
											<div className='border-[3px] border-bluegray-100 border-solid h-6 w-6'></div>
											<div className='flex flex-row gap-2 items-start justify-start w-auto'>
												<Img
													className='h-6 w-6'
													src='images/img_star1_24X24.svg'
													alt='StarOne One'
												/>
												<Img
													className='h-6 w-6'
													src='images/img_star2.svg'
													alt='StarTwo'
												/>
											</div>
										</div>
										<div className='flex flex-row gap-4 items-center justify-start w-[67%] md:w-full'>
											<div className='border-[3px] border-bluegray-100 border-solid h-6 w-6'></div>
											<div className='flex flex-row gap-2 items-start justify-start w-auto'>
												<Img
													className='h-6 w-6'
													src='images/img_star1_1.svg'
													alt='StarOne Two'
												/>
												<Img
													className='h-6 w-6'
													src='images/img_star2_24X24.svg'
													alt='StarTwo One'
												/>
												<Img
													className='h-6 w-6'
													src='images/img_star3.svg'
													alt='StarThree'
												/>
											</div>
										</div>
										<List
											className='flex flex-col gap-4 items-center w-full'
											orientation='vertical'
										>
											<div className='flex md:flex-1 flex-row gap-4 items-center justify-start w-[84%] md:w-full'>
												<Button
													className='flex h-6 items-center justify-center w-6'
													shape='square'
													color='gray_800'
													size='xs'
													variant='fill'
												>
													<Img
														src='images/img_checkedbox.svg'
														alt='Checkedbox One'
													/>
												</Button>
												<div className='flex flex-row gap-2 items-start justify-start w-auto'>
													<Img
														className='h-6 w-6'
														src='images/img_star1_2.svg'
														alt='StarOne Three'
													/>
													<Img
														className='h-6 w-6'
														src='images/img_star2_1.svg'
														alt='StarTwo Two'
													/>
													<Img
														className='h-6 w-6'
														src='images/img_star3_24X24.svg'
														alt='StarThree One'
													/>
													<Img
														className='h-6 w-6'
														src='images/img_star5.svg'
														alt='StarFive'
													/>
												</div>
											</div>
											<div className='flex flex-1 flex-row gap-4 items-center justify-between w-full'>
												<div className='border-[3px] border-bluegray-100 border-solid h-6 w-6'></div>
												<div className='flex flex-row items-start justify-start w-auto'>
													<RatingBar
														className='flex justify-between w-[152px]'
														value={5}
														starCount={5}
														activeColor='#fae952'
														size={24}
													></RatingBar>
												</div>
											</div>
										</List>
									</div>
								</div>
							</div>
							<Line className='bg-bluegray-100 h-px w-full' />
						</div>
						<div className='flex flex-row items-end justify-between w-full'>
							<Text
								className='mt-[5px] text-gray-800 text-lg'
								size='txtPoppinsMedium18'
							>
								Filter by Brand
							</Text>
							<Img
								className='h-6 mb-0.5 w-6'
								src='images/img_arrowdown.svg'
								alt='arrowdown Two'
							/>
						</div>
						<div className='flex flex-row items-end justify-between w-full'>
							<Text
								className='mt-[5px] text-gray-800 text-lg'
								size='txtPoppinsMedium18'
							>
								Filter by Size
							</Text>
							<Img
								className='h-6 mb-0.5 w-6'
								src='images/img_arrowdown.svg'
								alt='arrowdown Three'
							/>
						</div>
					</div>
					<div className='flex md:flex-1 flex-col items-center justify-start w-[84%] md:w-full sm:mt-3'>
						<div className='flex md:flex-col flex-row flex-wrap gap-8 items-center w-full'>
							{categories.map((i) => (
								<Link
									className='bg-gray-50  border-2 hover:border-gray-800 flex md:flex-1 flex-col items-center justify-start p-[50px] sm:p-3 w-[16%] md:w-full cursor-pointer'
									to={'/productList'}
									key={i.id}
								>
									<div className='flex flex-col gap-[26px] items-center justify-start w-[47%] md:w-full'>
										<Img
											className='h-[68px] w-[68px]'
											src={`${i.image}`}
											alt={i.name}
										/>
										<Text
											className='text-gray-500 text-lg'
											size='txtPoppinsRegular18Gray500'
										>
											{i.name}
										</Text>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categories;
