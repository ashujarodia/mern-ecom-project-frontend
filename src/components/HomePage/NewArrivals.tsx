import { Text } from '..';
import { useGetLatestProductsQuery } from '../../redux/api/productApi';
import { SkeletonLoader } from '../Loader';
import ProductCard from '../Product/ProductCard';

const NewArrivals = () => {
	const { data, isLoading } = useGetLatestProductsQuery('');

	const newArrivalsData = data?.products;

	return (
		<div className='flex flex-col items-center justify-start max-w-[1632px] mt-[100px] mx-auto pt-[7px] md:px-5 w-full px-6'>
			<div className='flex flex-col gap-[42px] items-center justify-start w-full'>
				<div>
					<Text
						className='text-4xl sm:text-[32px] md:text-[34px] text-gray-800'
						size='txtPoppinsBold36'
					>
						New Arrivals
					</Text>
				</div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className='grid grid-cols-5 gap-12 sm:grid-cols-1 md:grid-cols-2'>
						{newArrivalsData?.map((i) => (
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
				)}
			</div>
		</div>
	);
};

export default NewArrivals;
