import { Link } from 'react-router-dom';
import { Img, RatingBar, Text } from '..';
import { useGetPopularProductsQuery } from '../../redux/api/productApi';
import { server } from '../../redux/store';

const Popular = () => {
	const { data } = useGetPopularProductsQuery('');

	return (
		<div className='flex flex-col gap-8 items-center justify-start max-w-[1632px] mt-[100px] mx-auto pt-[11px] md:px-5 w-full px-6'>
			<div>
				<Text
					className='text-4xl sm:text-[32px] md:text-[34px] text-gray-800'
					size='txtPoppinsBold36'
				>
					Popular This Week
				</Text>
			</div>
			<div className='md:gap-5 gap-8 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full'>
				{data?.products.map((i) => (
					<Link
						className='flex flex-1 sm:flex-col flex-row gap-4 h-[220px] md:h-auto items-center justify-start p-6 sm:px-5 w-full border-2 hover:border-gray-900'
						key={i._id}
						to={`/product/${i._id}`}
					>
						<Img
							className='sm:flex-1 h-[175px] md:h-auto object-cover w-[48%] sm:w-full'
							src={`${server}/${i.photo}`}
							alt='placeholder Twelve'
						/>
						<div className='flex flex-col gap-4 items-start justify-start w-auto'>
							<div className='flex flex-col gap-2 items-start justify-start w-auto'>
								<Text
									className='text-2xl md:text-[22px] text-gray-800 sm:text-xl w-auto'
									size='txtPoppinsMedium24'
								>
									{i.name}
								</Text>
								<Text
									className='text-2xl md:text-[22px] text-gray-500 sm:text-xl w-auto'
									size='txtPoppinsMedium24Gray500'
								>
									₹{i.price}
								</Text>
							</div>
							<div className='flex flex-row items-start justify-start w-auto'>
								<RatingBar
									className='flex justify-between w-[152px]'
									value={i.rating}
									starCount={i.rating}
									color='#f6f7fb'
									activeColor='#fae952'
									size={24}
								></RatingBar>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Popular;
